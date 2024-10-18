# AI-Powered Image Generation Platform

This platform allows users to create, upload, and download images with the help of AI, specifically using Hugging Face's FLUX model.

## Features

- Create images using AI
- Upload existing images
- Download generated or uploaded images
- User-friendly interface

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (with Mongoose)
- **Frontend**: React, Vite
- **Image Storage**: Cloudinary
- **AI Integration**: OpenAI, Hugging Face FLUX
- **Additional Libraries**: 
  - Backend: cors, dotenv, nodemon
  - Frontend: react-router-dom, file-saver

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/image-generation-platform.git
   ```

2. Install backend dependencies
   ```
   cd server
   npm install --y
   ```

3. Install frontend dependencies
   ```
   cd client
   npm install --y
   ```

4. Set up environment variables
   Create a `.env` file in the backend directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

### Running the application

1. Start the backend server
   ```
   cd server
   npm start
   ```

2. Start the frontend development server
   ```
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite)
