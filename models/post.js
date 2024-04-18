import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    originalname:{
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: true,
        unique: true,
    },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
