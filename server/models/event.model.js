import mongoose from "mongoose"

const Event = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventImage: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    createdAt: { type: Date },
    inviter: { type: mongoose.Schema.Types.ObjectId, ref: "Inviter", required: true},
}, {collection: 'event'});

const model = mongoose.model("Event", Event);
export default model;