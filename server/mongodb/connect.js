import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.set('strictQuery', true); // Strict query set true for searching feature
    mongoose.connect(url)
        .then(() => console.log('connected to mongo')) // Uses promises , can be as asynced as well 
        .catch((err) => {
            console.error('failed to connect with mongo');
            console.error(err);
        });
};

// Exporting for further useage
export default connectDB;