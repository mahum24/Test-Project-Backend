import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv'

dotenv.config()
const app = express();

const PORT = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL

mongoose.connect(databaseURL)
    .then(() => console.log("connected"))
    .catch((error) => console.log(error));

app.use(cors());
app.use(bodyParser.json());

app.use("/api/post", postRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));