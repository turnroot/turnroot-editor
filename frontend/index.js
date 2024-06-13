import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 14913

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use('/components', express.static(path.join(__dirname, 'components')))
app.use('/functions', express.static(path.join(__dirname, 'functions')))
app.use('/style', express.static(path.join(__dirname, 'style')))
app.use('/lib', express.static(path.join(__dirname, 'lib')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './preview.html'))
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})