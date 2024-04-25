import crypto from 'crypto';
import { uploadFile, getObjectSignedUrl } from '../s3.js';
import Post from '../models/post.js';
import multer from 'multer';
import  axios from 'axios'

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const imageUrl = await getObjectSignedUrl(post.imageName);
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageData = Buffer.from(response.data, 'binary');
        
        res.end(JSON.stringify({ post, imageData }));
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createPost = async (req, res) => {
    try {
        const file = req.file;
        const imageName = generateFileName();
        const fileBuffer = file.buffer;
        await uploadFile(fileBuffer, imageName, file.mimetype);
        const post = await Post.create({
            imageName: imageName,
            originalname: req.file.originalname
        });
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
