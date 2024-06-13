import cron from 'node-cron'
import nodemailer from 'nodemailer'
import {db} from './db.js'
import {cancelSubscription} from './stripe.js'

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_FROM_USERNAME,
        pass: process.env.EMAIL_FROM_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
})

const sendMail = async (to, subject, body) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html: body,
        })
    } catch (error) {
        console.log(error)
    }
}

const inactiveMonth = async () => {
    try {
        const sql = `SELECT userId, email FROM Users WHERE lastLogin < DATE_SUB(NOW(), INTERVAL 1 MONTH)`
        const [rows] = await db.query(sql)

        if (rows.length === 0) {
            return
        }

        for (const row of rows) {
            try {
                await sendMail(row.email, 'Reminder: you have an active Turnroot account and project', `Hey there, it's been a while since you last logged in to your Turnroot account. Your project and data are safe- we just wanted to remind you that you have an active account and monthly subscription.`)
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }

}

const prePruneUsers = async () => {
    try {
        const sql = `SELECT userId, email FROM Users WHERE lastLogin < DATE_SUB(NOW(), INTERVAL 3 MONTH)`
        const [rows] = await db.query(sql)

        if (rows.length === 0) {
            return
        }

        for (const row of rows) {
            try {
                await sendMail(row.email, 'Inactive account deletion warning', `Hey there, you've been inactive for a few months. We don't want to keep charging you for a service you're not using, so your Turnroot account, and connected project, will be deleted in two months. Please log in to your account to prevent deletion.`)
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const secondPrePruneUsers = async () => {
    try {
        const sql = `SELECT userId, email FROM Users WHERE lastLogin < DATE_SUB(NOW(), INTERVAL 4 MONTH)`
        const [rows] = await db.query(sql)

        if (rows.length === 0) {
            return
        }

        for (const row of rows) {
            try {
                await sendMail(row.email, 'Inactive account deletion warning', `Your Turnroot account, and connected project, will be deleted in one month! You will lose your data if you don't log in soon.<br/> Your Turnroot community forums account will not be affected. Your subscription will be automatically canceled when your account is removed. Please log in to your account to prevent deletion.`)
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }

}

const pruneUsers = async () => {
    try {
        const sql = `SELECT userId, email FROM Users WHERE lastLogin < DATE_SUB(NOW(), INTERVAL 5 MONTH)`
        const [rows] = await db.query(sql)

        if (rows.length === 0) {
            return
        }

        for (const row of rows) {
            try {
                await sendMail(row.email, 'Inactive account deletion', `Your Turnroot account, and connected project, has been deleted due to inactivity. Your Turnroot community forums account will not be affected. Your subscription has been cancelled. We're sad to see you go!`)
                await sendMail(process.env.ADMIN_EMAIL, 'Inactive account deletion', `User ${row.userId} ${row.username}:(${row.email}) has been deleted. Please delete their data from the database.`)
                db.query('UPDATE Users SET stripeCustomerId = NULL, stripeSubscriptionId = NULL, paymentMethodId = NULL, PASSWORD = NULL, USERNAME = NULL, WHERE userId = ?', [row.userId])
            } catch (error) {
                console.log(error)
            }
            try {
                await cancelSubscription(row.email)
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

cron.schedule('23 12 * * 5', prePruneUsers)
cron.schedule('24 12 * * 5', secondPrePruneUsers)
cron.schedule('46 12 * * 6', pruneUsers)
cron.schedule('35 8 * * 5', inactiveMonth)
