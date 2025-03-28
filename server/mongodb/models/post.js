import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    name: String,
    prompt: String,
    photo: String, // Encoded cloudinary media upload file
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Post = mongoose.model('Post', PostSchema);

// Export model not the schema
export default Post