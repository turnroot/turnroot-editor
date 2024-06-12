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

const prePruneUsers = async () => {
    try {
        const sql = `SELECT userId, email FROM Users WHERE lastLogin < DATE_SUB(NOW(), INTERVAL 3 MONTH)`
        const [rows] = await db.query(sql)

        if (rows.length === 0) {
            return
        }

        for (const row of rows) {
            try {
                await sendMail(row.email, 'Inactive account deletion warning', `Your Turnroot account, and connected project, will be deleted in two months. Your Turnroot community forums account will not be affected. Your subscription will be automatically canceled when your account is removed. Please log in to your account to prevent deletion.`)
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
            } catch (error) {
                console.log(error)
            }
            try {
                await cancelSubscription(row.email)
                await db.query('DELETE FROM Users WHERE userId = ?', [row.userId])
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

cron.schedule('0 12 * * 5', prePruneUsers)
cron.schedule('0 12 * * 6', pruneUsers)