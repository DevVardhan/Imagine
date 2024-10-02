import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import hugfaceRoutes from './routes/hugfaceRoutes.js'

// pulls env vars from the dotenv file
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/hface', hugfaceRoutes)

app.get('/', async (req, res) => {
    res.send("backend connected ")
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(5050, () => console.log("app listening at port 8080"))
    } catch (err) {
        console.log(err)
    }
}

startServer()