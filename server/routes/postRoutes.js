import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary' // Used for uploading media to webapp 

import Post from '../mongodb/models/post.js' // Mongoose model

dotenv.config()

const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Get all post (used in useeffect for the home page)
router.route("/").get(async (req, res) => {
    try {
        const posts = await Post.find({}) // Finds all post from post model

        res.status(200).json({ success: true, data: posts })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message }) // In case when req is empty or headers are missing 
    }
})

// Create a post
router.route("/").post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body

        // Function retunrs an object with  parms id , url , createdate .. etc (refer cloudinary docs)
        const photoUrl = await cloudinary.uploader.upload(photo, (error, result) => {
            if (error) {
                console.error("Cloudinary upload error: ", error);
                return res.status(500).json({ success: false, message: "Failed to upload image" });
            }
            return result;
        });

        // Uploading a new post to database
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({ success: true, data: newPost })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})


export default router