// import express from 'express'
// import multer from 'multer'
// import crypto from 'crypto'
// import mongoose  from 'mongoose'
// import cors from 'cors';
// import bodyParser  from 'body-parser'
// import { uploadFile, getObjectSignedUrl } from './s3.js'

// const app = express()
// const PORT = 3001;
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

// mongoose.connect('mongodb://127.0.0.1:27017/test-projec-db')
// .then(()=>console.log("connected"))
// .catch((error)=>console.log(error))

// const postScehema = new mongoose.Schema({
//     originalname:{
//         type: String,
//         required: true,
//     },
//     imageName: {
//         type: String,
//         required: true,
//         unique: true,
//     },
// })
// const Post = mongoose.model('post', postScehema)
// const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
// app.use(cors())
// app.get("/api/post/:id", async (req, res) => {
   
//   // Handle the ID as needed
//   console.log('Received ID:', req.params.id);

//   const post = await Post.find({_id:  req.params.id})
//   const imageUrl = await getObjectSignedUrl(post[0].imageName)
//    const new_post = {
//     ...post,
//     imageUrl
//    }
//     res.send(new_post)
// })


// app.post('/api/posts', upload.single('image'), async (req, res) => {
//   const file = req.file
//   console.log(req.file)
//   const imageName = generateFileName()
//   const fileBuffer = file.buffer
//   await uploadFile(fileBuffer, imageName, file.mimetype)

//   const post = await Post.create({
//     imageName: imageName,
//     originalname: req.file.originalname
//   })
//   console.log(post)
//   res.status(201).send(post)
// })


// app.listen(PORT, () => console.log(`listening on port ${PORT}`))




import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes.js';

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/test-projec-db')
    .then(() => console.log("connected"))
    .catch((error) => console.log(error));

app.use(cors());
app.use(bodyParser.json());

app.use("/api/post", postRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));