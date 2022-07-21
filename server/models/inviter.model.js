import mongoose from "mongoose";

const Inviter = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true}],
}, {collection: 'inviter'});

const model = mongoose.model("Inviter", Inviter);

export default model;