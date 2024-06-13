import Stripe from 'stripe'
import {db} from './db.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createSubscription = async (username, extraDonation) => {
    try {
        const customer = await stripe.customers.create({
            email: username,
        })

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {price: process.env.MONTHLY_PRICE_ID, quantity: 1},
                {price: process.env.EXTRA_DONATION_PRICE_ID, quantity: extraDonation || 0},
            ],
        })
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customer.id,
            type: 'card',
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

export {createSubscription, cancelSubscription, getSubscription, stripe}