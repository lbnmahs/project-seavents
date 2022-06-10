import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const CONN = process.env.DATABASE_ACCESS
const PORT = process.env.PORT || 4000
mongoose.connect(CONN, { useNewUrlParser: true, useUnifiedTopology: true }, () => {console.log('Connected to database')})

app.listen(PORT, console.log(`Server listening on port: ${PORT}`))