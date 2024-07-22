import Stripe from 'stripe'
import {db} from './db.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createSubscription = async (username, extraDonation) => {
    try {
        let customer = await getCustomerByUsername(username)
        if (!customer) {
            customer = await stripe.customers.create({
                email: username,
            })
        }

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {price: process.env.MONTHLY_PRICE_ID, quantity: 1},
                {price: process.env.EXTRA_DONATION_PRICE_ID, quantity: extraDonation || 0},
            ],
        })

        if (subscription.status !== 'active') {
            throw new Error('Subscription creation failed')
        }

        const paymentMethods = await stripe.paymentMethods.list({
            customer: customer.id,
        })

        const defaultPaymentMethod = paymentMethods.data[0]

        const sql = 'UPDATE Users SET stripeCustomerId = ?, stripeSubscriptionId = ?, paymentMethodId = ? WHERE username = ?'
        await db.query(sql, [customer.id, subscription.id, defaultPaymentMethod.id, username])
    } catch (error) {
        console.log(error)
    }
}

const cancelSubscription = async (username) => {
    try {
        const sql = 'SELECT stripeCustomerId, stripeSubscriptionId FROM Users WHERE username = ?'
        const [rows] = await db.query(sql, [username])

        if (rows.length === 0) {
            return
        }

        const {stripeCustomerId, stripeSubscriptionId} = rows[0]

        await stripe.subscriptions.del(stripeSubscriptionId)

        await db.query('UPDATE Users SET stripeCustomerId = NULL, stripeSubscriptionId = NULL, paymentMethodId = NULL WHERE username = ?', [username])
    } catch (error) {
        console.log(error)
    }
}

const getSubscription = async (username) => {
    try {
        const sql = 'SELECT stripeSubscriptionId FROM Users WHERE username = ?'
        const [rows] = await db.query(sql, [username])

        if (rows.length === 0) {
            return null
        }

        return await stripe.subscriptions.retrieve(rows[0].stripeSubscriptionId)
    } catch (error) {
        console.log(error)
    }
}

const getOneTimePayment = async (username) => {
    try {
        const sql = 'SELECT paymentMethodId FROM Users WHERE username = ?'
        const [rows] = await db.query(sql, [username])

        if (rows.length === 0) {
            return null
        }

        return await stripe.paymentMethods.retrieve(rows[0].paymentMethodId)
    } catch (error) {
        console.log(error)
    }
}

const createOneTimePayment = async (username) => {
    try {
        let customer = await getCustomerByUsername(username)
        if (!customer) {
            customer = await stripe.customers.create({
                email: username,
            })
        }

        const paymentMethods = await stripe.paymentMethods.list({
            customer: customer.id,
        })

        const defaultPaymentMethod = paymentMethods.data[0]
        const payment = await stripe.paymentIntents.create({
            amount: process.env.ONE_TIME_PAYMENT_AMOUNT,
            currency: 'usd',
            customer: customer.id,
            payment_method: defaultPaymentMethod.id,
            confirm: true,
        })

        if (payment.status !== 'succeeded') {
            throw new Error('Payment failed')
        }

        const sql = 'UPDATE Users SET stripeCustomerId = ?, paymentId = ?, paymentMethodId = ? WHERE username = ?'
        await db.query(sql, [customer.id, payment.id, defaultPaymentMethod.id, username])
    } catch (error) {
        console.log(error)
    }
}

export {createSubscription, cancelSubscription, getSubscription, getOneTimePayment, createOneTimePayment, stripe}