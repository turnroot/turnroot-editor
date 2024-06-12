import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
dotenv.config()

import mysql from 'mysql'

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Database connected')
    }
})

let sql = `SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = ?
    AND table_name = 'Users')`

db.query(sql,[process.env.DB_NAME], (err, result) => {
    if (err) throw err

    if (!result[0][Object.keys(result[0])[0]]) {
        sql = `CREATE TABLE Users(
    userId VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255))`

        db.query(sql, (err, result) => {
            if (err) throw err
            console.log("Users table created")
        })
    }
})

sql = `SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = ? 
    AND table_name = 'UsedStrings')`

db.query(sql, [process.env.DB_NAME], (err, result) => {
    if (err) throw err


    if (!result[0][Object.keys(result[0])[0]]) {
        sql = `CREATE TABLE UsedStrings(
    usedString VARCHAR(255))`
        db.query(sql, (err, result) => {
            if (err) throw err
            console.log("UsedStrings table created")
        })
    }
})

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
                if (err) reject(err)

                if (result[0][Object.keys(result[0])[0]]) {
                    str = randomString()
                    checkAndInsertString()
                } else {
                    sql = 'INSERT INTO UsedStrings (usedString) VALUES (?)';
                    db.query(sql, [str], (err, result) => {
                        if (err) reject(err)
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

const createUser = async (username, email, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) reject(err)

            const userId = await generateDbName()
            const sql = 'INSERT INTO Users (userId, username, email, password) VALUES (?, ?, ?, ?)'

            db.query(sql, [userId, username, email, hash], (err, result) => {
                if (err) reject(err)
                resolve({userId, username, email})
            })
        })
    })
}

const getUser = (username) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Users WHERE username = ?'

        db.query(sql, [username], (err, result) => {
            if (err) reject(err)
            let user = result[0]
            delete user.password
            resolve(user)
        })
    })
}

const loginUser = (username, password, email=null) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Users WHERE username = ?'
        let value = username

        if (email) {
            sql = 'SELECT * FROM Users WHERE email = ?'
            value = email
        }

        db.query(sql, [value], (err, result) => {
            if (err) reject(err)

            if (result.length === 0) {
                resolve(null)
            } else {
                bcrypt.compare(password, result[0].password, (err, res) => {
                    if (err) reject(err)

                    if (res) {
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

export {createUser, getUser, getUserUserId, loginUser, db}