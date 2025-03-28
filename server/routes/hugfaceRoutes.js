import express from 'express'
import * as dotenv from 'dotenv'
import path from 'path'; // For local logs
import fs from 'fs'; // For local file access

dotenv.config()

const router = express.Router()

async function query(prompt) {
    try {
        const res = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_SECRET}`,
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(prompt),
                target_size: '1024x1024',

            }
        );
        const buffer = await res.arrayBuffer(); // Fetch the response as a buffer
        const base64String = Buffer.from(buffer).toString('base64'); // Convert to base64
        return base64String;
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.res.data.error.message || 'Something went wrong');
    }
}



router.route('/').get((req, res) => {
    res.send("hello from hugging face api FLUX")
})

router.route('/').post(async (req, res) => {
    const { prompt } = req.body;
    try {
        const base64Image = await query({ inputs: prompt });
        const filePath = path.join('./', 'Prompt_logs.txt');

        // To maintain history 
        var timeInMss = new Date().getTime()
        fs.appendFile(filePath, `/t${timeInMss}:${prompt} `, (err) => {
            if (err) {
                console.error('Error writing the file:', err);
                return;
            }
        })

        console.log('Logs the requested promot at:', filePath);
        res.status(200).json({ photo: base64Image });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Something went wrong');
    }

})

export default router





