import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import invitersRouter from './routes/inviters';
import invitersAuthRouter from './routes/invitersAuth';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const CONN = process.env.DATABASE_ACCESS
const PORT = process.env.PORT || 4000
mongoose.connect(CONN, { useNewUrlParser: true, useUnifiedTopology: true }, () => {console.log('Connected to database')})

//routes
app.use('/inviters', invitersRouter);
app.use('/inviters/auth', invitersAuthRouter);

app.listen(PORT, console.log(`Server listening on port: ${PORT}`))