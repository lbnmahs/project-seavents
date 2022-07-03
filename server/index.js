import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Inviter from './models/inviter.model';
import Vendor from './models/vendor.model';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const CONN = process.env.DATABASE_ACCESS
const PORT = process.env.PORT || 5000
mongoose.connect(CONN, { useNewUrlParser: true, useUnifiedTopology: true }, () => {console.log('Connected to database')})

//routes
app.post('/api/inviters/auth/register', async (req, res) => {
    console.log(req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await Inviter.create({ 
            userName: req.body.userName,
            email: req.body.email,
            password: newPassword
        })
        res.json({ message: 'Inviter created' })
    }catch(err){
        console.log(err)
        res.json({ message: 'Error creating inviter' })
    }
})

app.post('/api/inviters/auth/login', async (req, res) => {
   const inviter = await Inviter.findOne({ email: req.body.email })
   if(!inviter){
        return { status: 'error', message: 'Inviter not found' }
   }
   const isPasswordValid = await bcrypt.compare(req.body.password, inviter.password)
   if(isPasswordValid){
        const token = jwt.sign({ email: inviter.email }, process.env.JWT_KEY, { expiresIn: '1h' })
        return res.json({ status: 'ok', inviter: token })
   }else{
        return res.json({ status: 'error', message: 'Invalid email or password', inviter: false })
   }
})

app.post('/api/vendors/auth/register', async (req, res) => {
    console.log(req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await Vendor.create({ 
            vendorName: req.body.vendorName,
            email: req.body.email,
            firstPhoneNumber: req.body.firstPhoneNumber,
            secondPhoneNumber: req.body.secondPhoneNumber,
            password: newPassword
        })
        res.json({ message: 'Vendor created' })
    }catch(err){
        console.log(err)
        res.json({ message: 'Error creating vendor' })
    }
})

app.post('/api/vendors/auth/login', async (req, res) => {
    const vendor = await Vendor.findOne({ email: req.body.email })
    if(!vendor){
        return { status: 'error', message: 'Vendor not found' }
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, vendor.password)
    if(isPasswordValid){
        const token = jwt.sign({ email: vendor.email }, process.env.JWT_KEY, { expiresIn: '1h' })
        return res.json({ status: 'ok', vendor: token })
    }else{
        return res.json({ status: 'error', message: 'Invalid email or password', vendor: false })
    }
})

app.listen(PORT, console.log(`Server listening on port: ${PORT}`))