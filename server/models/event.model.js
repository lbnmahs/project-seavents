import mongoose from "mongoose"

const Event = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    budget: { type: Number, required: true },
    inviter: { type: mongoose.Schema.Types.ObjectId, ref: "Inviter", required: true},
}, {collection: 'event'});

const model = mongoose.model("Event", Event);
export default model;