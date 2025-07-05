import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import hugfaceRoutes from './routes/hugfaceRoutes.js'

// Pulls env vars from the dotenv file
dotenv.config()

const app = express()
// Cors used for security and cross-origin access
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));
app.use(cors());
app.options('*', cors());
// Enables parsing json format in requests ; limited body size to 50mb since it is possible for images to be large
app.use(express.json({ limit: '50mb' }))

// Routes defined 
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/hface', hugfaceRoutes)

// Fucntion to verify connections
app.get('/', async (req, res) => {
    res.send("backend connected ")
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL) // Utils from connect.js
        app.listen(5050, () => console.log("app listening at port 8080"))
    } catch (err) {
        console.log(err)
    }
}

startServer()