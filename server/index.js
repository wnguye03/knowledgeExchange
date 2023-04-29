import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
// import dotenv from 'dotenv';
import PostRoute from './routes/posts.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// dotenv.config();


app.use('/posts', PostRoute);

const mongoURI = 'mongodb+srv://william:123456789Nugget@knowledgeexchange.ch8066f.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8080;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("connected to DB"))
        .then(() => app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`)))
        .catch((err) => console.log(err.message));
