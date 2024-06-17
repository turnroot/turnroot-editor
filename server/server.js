import express, { text } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import session from 'express-session'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import {createSubscription, cancelSubscription, getSubscription, stripe} from './functions/stripe.js'
import path from 'path'
import { fileURLToPath } from 'url'

import { loginUser, getUser, createUser, getUserByEmail, getUserUserId } from './functions/db.js'

import { establishConnection, sendToFromDatabase } from './functions/hit_schemas.js'

const app = express()
app.use(bodyParser.raw({type: 'application/json'}))
dotenv.config()

app.use(cors(
    {
        origin: process.env.LOCAL === 'true' ? 'http://localhost:26068' : 'https://editor.turnroot.com',
        credentials: true,
    }
))

if (process.env.LOCAL === 'false') {
app.use(helmet(
    {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", 'https://js.stripe.com', 'https://cdn.jsdelivr.net'],
                styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net', 'https://code.cdn.mozilla.net'],
                imgSrc: ["'self'", 'data:', 'https://js.stripe.com'],
                connectSrc: ["'self'", 'https://api.stripe.com', 'https://js.stripe.com'],
                frameSrc: ["'self'", 'https://js.stripe.com'],
                objectSrc: ["'none'"],
                baseUri: ["'self'"],
                formAction: ["'self'"],
                upgradeInsecureRequests: [],
            },
        },
    }
))
}

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, cookie: { secure: process.env.LOCAL === 'false' ? true : false }))

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
    done(null, { username: user.username, userId: user.userId })
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.use(passport.session())

if (process.env.LOCAL === 'false') {
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300 
})
app.use(limiter)
}

app.use(morgan(process.env.LOCAL === 'true' ? 'dev' : 'common'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), 'view')

app.use('/components', express.static(path.join(__dirname, 'components')))
app.use('/functions', express.static(path.join(__dirname, 'functions')))
app.use('/style', express.static(path.join(__dirname, 'style')))
app.use('/lib', express.static(path.join(__dirname, 'lib')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './preview.html'))
})

app.post('/login', function(req, res, next) {
    if (process.env.LOCAL === 'true'){
        establishConnection(req, res).catch((err) => {
            console.error(err)
        })
    }
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return next(err) 
        }
        if (!user) { 
            return res.status(418).send('User not found')
        }
        req.logIn(user, async function(err) {
            if (err) { 
                return next(err)
            }
            let loginresult = await loginUser(req, res).catch((err) => {
                console.error(err)
            })
            if (!loginresult) {
                return res.status(500).send('Login failure')
            }
            establishConnection(req, res).catch((err) => {
                console.error(err)
            })
        })
    })(req, res, next)
})

app.post('/register', async (req, res) => {
    const user = req.body
    const newUser = await createUser(user)
    if (!newUser) {
        res.status(400).send('User creation failed')
        return
    }

    req.logIn(newUser, async function(err) {
        if (err) {
            console.error(err)
            return res.status(500).send('Login after registration failed')
        }

        try {
            await loginUser(req, res)
            establishConnection(req, res).catch((err) => {
                console.error(err)
            })
        } catch (err) {
            console.error(err)
            return res.status(500).send('Login after registration failed')
        }
    })
})

app.post('/data', async (req, res) => {
    if (process.env.LOCAL === 'false'){
    if (!req.user) {
        res.status(401).send('Unauthorized')
        return
    }}
    let subscription
    if (!req.user.subscription) {
        subscription = process.env.LOCAL === 'false' ? await getSubscription(req.user.username) : 'local'
        req.user.subscription = subscription
    } else {
        subscription = req.user.subscription
    }
    if (!subscription) {
        res.status(401).send('User is not subscribed')
        return
    }
    sendToFromDatabase(req, res).catch((err) => {
        console.error(err)
    })
})

app.get('/logout', (req, res) => {
    req.logout()
    res.status(200).send('Logged out')
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
        let textOnly = err.message.replace(/[^a-zA-Z ]/g, '')
        res.status(400).send(`Webhook Error: ${textOnly}`)
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

import './functions/crons.js'

app.listen(26068, () => {
    console.log('Server started on http://localhost:26068')
})