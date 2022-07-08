import mongoose from "mongoose";

const Guest = new mongoose.Schema({
    guestName: { type: String, required: true },
    guestEmail: { type: String, required: true, unique: true },
})

const Event = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    guests: [Guest],
})

const Inviter = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    events: [Event]
}, {collection: 'inviter'});

const model = mongoose.model("Inviter", Inviter);

export default model;