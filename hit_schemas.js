import dotenv from 'dotenv'
dotenv.config()

const establishConnection = async (req, res) => {
    if (process.env.LOCAL === 'false'){
        if (!req.user || !req.user.userId){
            return res.status(401).send('Unauthorized')
        }
    } else {
        req.user.userId = 'local'
    }
    let url = process.env.LOCAL === 'false' ? process.env.SCHEMAS_SERVER_URL : 'http://localhost:9194/'
    let body = {
        userId: req.user.userId,
        key: process.env.SCHEMAS_SERVER_KEY,
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    let response = await fetch(url, options).catch(err => console.error(err))
    try {
    let data = await response.json()
    return res.send(data)} catch (err) {
        return res.status(500).send('Error: invalid response from schemas server' + err)
    }
}

const sendToDatabase = async (req, res) => {
    let url = process.env.LOCAL === 'false' ? process.env.SCHEMAS_SERVER_URL + '/save' : 'http://localhost:9194/save'
    let body = {
        userId: req.user.userId,
        key: process.env.SCHEMAS_SERVER_KEY,
        data: req.body
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    let response = await fetch(url, options).catch(err => console.error(err))
    try {
    let data = await response.json()
    return res.send(data)}
    catch (err) {
        return res.status(500).send('Error: invalid response from schemas server' + err)
    
    }
}

export { establishConnection, sendToDatabase }