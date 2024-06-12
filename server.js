import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import session from 'express-session'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import {createSubscription, cancelSubscription, getSubscription, stripe} from './stripe.js'

import { loginUser, getUser, createUser, getUserByEmail, getUserUserId } from './db.js'

const app = express()
app.use(bodyParser.raw({type: 'application/json'}))
dotenv.config()

//app.use(cors())

app.use(helmet())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))

app.use(passport.initialize())
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await loginUser(username, password)
        if (!user) {
            return done(null, false)
        }
        return done(null, user)
    }
))

passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username, done) => {
    const user = await getUser(username)
    done(null, user)
})

app.use(passport.session())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
})
app.use(limiter)

app.use(morgan('combined'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/')
})

app.post('/register', async (req, res) => {
    const user = req.body
    const newUser = await createUser(user)
    if (!newUser) {
        res.status(400).send('User creation failed')
        return
    }
    res.send(newUser)
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

app.get('/user/:username', async (req, res) => {
    const user = await getUser(req.params.username)
    if (!user) {
        res.status(404).send('User not found')
        return
    }
    res.send(user)
})

app.post('/user/:userId', async (req, res) => {
    if (!req.user) {
        res.status(401).send('Unauthorized')
        return
    }
    const user = await getUserUserId(req.params.userId, req.user)
    if ( req.user.username !== user.username || req.user.email !== user.email) {
        res.status(401).send('Unauthorized')
        return
    }
    res.send(user)
})

app.post('/subscription', async (req, res) => {
    if (!req.user) {
        res.status(401).send('Unauthorized')
        return
    }
    const subscription = await getSubscription(req.user.username)
    res.send(subscription)
})

app.post('/subscription/create', async (req, res) => {
    if (!req.user) {
        res.status(401).send('Unauthorized')
        return
    }
    const subscription = await createSubscription(req.user.username, req.body.extraDonation)
    res.send(subscription)
})

app.post('/subscription/cancel', async (req, res) => {
    if (!req.user) {
        res.status(401).send('Unauthorized')
        return
    }
    await cancelSubscription(req.user.username)
    res.send('Subscription canceled')
})

app.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature']
    let event
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
    }

    switch (event.type) {
        case 'invoice.payment_succeeded':
            let invoice = event.data.object
            customer = await stripe.customers.retrieve(invoice.customer)
            user = await getUserByEmail(customer.email)
            subscription = await getSubscription(user.username)
            if (subscription.status === 'canceled') {
                await createSubscription(user.username)
            }
            console.log('Payment succeeded for', user.username)
            break
        case 'invoice.payment_failed':
            let paymentIntent = event.data.object
            let customer = await stripe.customers.retrieve(paymentIntent.customer)
            let user = await getUserByEmail(customer.email)
            await cancelSubscription(user.username)
            let sql = 'UPDATE Users SET stripeCustomerId = NULL, stripeSubscriptionId = NULL, paymentMethodId = NULL WHERE username = ?'
            await db.query(sql, [user.username]).catch(console.error)
            break
        case 'customer.subscription.deleted':
            let subscription = event.data.object
            customer = await stripe.customers.retrieve(subscription.customer)
            user = await getUserByEmail(customer.email)
            sql = 'UPDATE Users SET stripeCustomerId = NULL, stripeSubscriptionId = NULL, paymentMethodId = NULL WHERE username = ?'
            await db.query(sql, [user.username]).catch(console.error)
            break
        default:
            return res.status(400).end()
    }
    res.json({received: true})
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.message)
})

app.listen(26068, () => {
    console.log('Server started')
})