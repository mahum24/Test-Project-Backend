// routes/postRoutes.js
import express from 'express';
import { getPostById, createPost } from '../controllers/postController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/:id", getPostById);
router.post('/', upload.single('image'), createPost);

export default router;
