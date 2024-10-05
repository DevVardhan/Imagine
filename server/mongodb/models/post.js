import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    name: String,
    prompt: String,
    photo: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Post = mongoose.model('Post', PostSchema);

// export model not the schema
export default Post