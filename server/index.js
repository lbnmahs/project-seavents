import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Inviter from './models/inviter.model.js';
import Vendor from './models/vendor.model.js';
import Event from './models/event.model.js';
import * as path from 'path';
import {fileURLToPath} from 'url';


dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const CONN = process.env.DATABASE_ACCESS
const PORT = process.env.PORT || 1337
mongoose.connect(CONN, { useNewUrlParser: true, useUnifiedTopology: true }, () => {console.log('Connected to database')})

//routes
// INVITER ROUTES
// inviter signup
app.post('/api/inviters/auth/register', async (req, res) => {
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await Inviter.create({ 
            userName: req.body.userName,
            email: req.body.email,
            password: newPassword,
            events: []
        })
        res.json({ message: 'Inviter created' })
    }catch(err){
        console.log(err)
        res.json({ message: 'Error creating inviter' })
    }
})
// inviter login
app.post('/api/inviters/auth/login', async (req, res) => {
   const inviter = await Inviter.findOne({ email: req.body.email })
   if(!inviter){
        return { status: 'error', message: 'Inviter not found' }
   }
   const isPasswordValid = await bcrypt.compare(req.body.password, inviter.password)
   if(isPasswordValid){
        const token = jwt.sign({ email: inviter.email, id: inviter._id, useName: inviter.userName }, process.env.JWT_KEY, { expiresIn: '1h' })
        return res.json({ status: 'ok', inviter: token })
   }else{
        return res.json({ status: 'error', message: 'Invalid email or password', inviter: false })
   }
})
// inviter adding event
app.post('/api/inviters/events/create', async (req, res) => {
    const { eventName, eventDescription, eventType, eventDate, eventTime, inviter, adults, children, budget } = req.body
    let existingInviter
    try{
       existingInviter = await Inviter.findById(inviter)
    }catch(err){
        console.log(err)
        return res.json({ status: 'error', message: 'Inviter not found' })
    }
    if(!existingInviter){
        return res.json({ status: 'error', message: 'Unable to find user with this ID' })
    }
    const event = new Event({ 
        eventName, eventDescription, eventType , eventDate, eventTime, inviter, adults, children, budget
     })
    try{
        const session = await mongoose.startSession()
        session.startTransaction()
        await event.save({ session})
        existingInviter.events.push(event)
        await existingInviter.save({ session })
        await session.commitTransaction()
        
    }catch(err){
        console.log(err)
        return res.json({ status: 'error', message: 'Error creating event' })
    }
    res.json({ message: 'Event created' })
})
// inviter updating event
app.put('/api/inviters/events/update/:id', async (req, res) => {
    try{
        await Event.findOneAndUpdate(req.params.id, {
            eventName: req.body.eventName,
            eventDescription: req.body.eventDescription,
            eventType: req.body.eventType,
            eventDate: req.body.eventDate,
            eventTime: req.body.eventTime,
            adults: req.body.adults,
            children: req.body.children,
            budget: req.body.budget

        })
        res.json({ message: 'Event updated' })
    }catch(err){
        console.log(err)
        res.json({ message: 'Error updating event' })
    }
})
// inviter getting their events
app.get('/api/inviters/events/:id', async (req, res) => {
    const id = req.params.id
    let event
    try{
        event = await Event.findById(id)
    }catch(err){
        console.log(err)
        res.json({ message: 'Error getting event' })
    }
    if(!event){
        res.json({ message: 'No event found' })
    }
    return res.json({ event })
})
// inviter deleting event
app.delete('/api/inviters/events/:id', async (req, res) => {
    let event
    try{
        event = await Event.findByIdAndDelete(req.params.id).populate('inviter')
        await event.inviter.events.pull(event)
        await event.inviter.save()
        res.json({ message: 'Event deleted' })
        if(!event){
            res.json({ message: 'No events found' })
        }
    }catch(err){
        console.log(err)
        res.json({ message: 'Error deleting event' })
    }
})
// inviter getting events
app.get('/api/inviters/events/inviterevent/:id', async (req, res) => {
    let inviterEvents;
    try{
        inviterEvents = await Inviter.findById(req.params.id).populate('events')
    }catch(err){
        console.log(err)
    }
    if(!inviterEvents){
        res.json({ message: 'No events found' })
    }
    return res.json({ events: inviterEvents })
})


// VENDOR ROUTES
app.post('/api/vendors/auth/register', async (req, res) => {
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

app.get('*', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, 'static/index.html'))
})


app.listen(PORT, console.log(`Server listening on port: ${PORT}`))