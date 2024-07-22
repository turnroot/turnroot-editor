import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
dotenv.config()

import mysql from 'mysql'

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})


const dbInit = () => {
    if (process.env.local === 'false') {
        db.connect((err) => {
            if (err) {
                console.log(err)
                return err
            } else {
                console.log('Database connected')
            }
        })

        db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err, result) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log('Database exists: ' + process.env.DB_NAME)
        })

        db.query(`USE ${process.env.DB_NAME}`, (err, result) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log('Using database: ' + process.env.DB_NAME)
        })

        let sql = `SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = ?
    AND table_name = 'Users')`

        db.query(sql, [process.env.DB_NAME], (err, result) => {
            if (err) {
                throw err
            }

            if (!result[0][Object.keys(result[0])[0]]) {
                sql = `CREATE TABLE Users(
    userId VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    lastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isSubscribed BOOLEAN DEFAULT FALSE,
    stripeCustomerId VARCHAR(255),
    stripeSubscriptionId VARCHAR(255),
    paymentMethodId VARCHAR(255),
    password VARCHAR(255))`

                db.query(sql, (err, result) => {
                    if (err) throw err
                    console.log("Users table created")
                })
            }
        })

        sql = `SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = ? 
    AND table_name = 'UsedStrings')`

        db.query(sql, [process.env.DB_NAME], (err, result) => {
            if (err) {
                throw err
            }


            if (!result[0][Object.keys(result[0])[0]]) {
                sql = `CREATE TABLE UsedStrings(
    usedString VARCHAR(255))`
                db.query(sql, (err, result) => {
                    if (err) throw err
                    console.log("UsedStrings table created")
                })
            }
        })
    }
}

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-"
const length = 18

const randomString = () => {
    let str = "";
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str
}
const randomStringUnique = () => {
    return new Promise((resolve, reject) => {
        let str = randomString()
        let sql = 'SELECT EXISTS(SELECT * FROM UsedStrings WHERE usedString = ?)';

        const checkAndInsertString = () => {
            db.query(sql, [str], (err, result) => {
                if (err) resolve(err)

                if (result[0][Object.keys(result[0])[0]]) {
                    str = randomString()
                    checkAndInsertString()
                } else {
                    sql = 'INSERT INTO UsedStrings (usedString) VALUES (?)';
                    db.query(sql, [str], (err, result) => {
                        if (err) resolve(err)
                        resolve(str)
                    })
                }
            })
        }
        checkAndInsertString()
    })
}

const generateDbName = async () => {
    const uniqueString = await randomStringUnique()
    return "_trdb_" + uniqueString
}

const createUser = async (user) => {
    db.query(`USE ${process.env.DB_NAME}`, (err, result) => {
        if (err) {
            console.log(err)
            return err
        }
    })
    let username = user.username
    let email = user.email
    let password = user.password
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) reject(err)

            const userId = await generateDbName()
            const sql = 'INSERT INTO Users (userId, username, email, password) VALUES (?, ?, ?, ?)'

            db.query(sql, [userId, username, email, hash], (err, result) => {
                if (err) resolve(err)
                resolve({
                    userId,
                    username,
                    email
                })
            })
        })
    })
}

const getUserByEmail = (email) => {
    db.query(`USE ${process.env.DB_NAME}`, (err, result) => {
        if (err) {
            console.log(err)
            return err
        }
    })
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Users WHERE email = ?'

        db.query(sql, [email], (err, result) => {
            if (err) reject(err)
            let user = result[0]
            delete user.password
            delete user.stripeCustomerId
            delete user.stripeSubscriptionId
            delete user.paymentMethodId
            resolve(user)
        })
    })
}

const loginUser = (username, password) => {
    db.query(`USE ${process.env.DB_NAME}`, (err, result) => {
        if (err) {
            console.log(err)
            return err
        }
    })
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Users WHERE username = ?'
        let value = username

        db.query(sql, [value], (err, result) => {
            if (err) resolve(err)

            if (result === undefined) {
                resolve(null)
            } else if (result && result.length === 0){
                resolve(null)
            } else {
                bcrypt.compare(password, result[0].password, (err, res) => {
                    if (err) resolve(err)

                    if (res) {
                        let sql = 'UPDATE Users SET lastLogin = CURRENT_TIMESTAMP WHERE username = ?'
                        db.query(sql, [result[0].username], (err, result) => {
                            if (err) resolve(err)
                        })
                        resolve(result[0])
                    } else {
                        resolve(null)
                    }
                })
            }
        })
    })
}

const getUserUserId = (userId, thisUser) => {
    db.query(`USE ${process.env.DB_NAME}`, (err, result) => {
        if (err) {
            console.log(err)
            return err
        }
    })
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Users WHERE userId = ?`
        db.query(sql, [userId], (err, result) => {
            if (err) reject(err)
            if (result[0].username === thisUser.username && result[0].email === thisUser.email) {
                resolve(result[0])
            } else {
                resolve(null)
            }
        })
    })
}

export {
    createUser,
    getUser,
    getUserUserId,
    getUserByEmail,
    loginUser,
    db,
    dbInit
}