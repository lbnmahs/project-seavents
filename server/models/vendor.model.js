import mongoose from 'mongoose'

const Vendor = new mongoose.Schema({
    vendorName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstPhoneNumber: { type: String, required: true, unique: true },
    secondPhoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {collection: 'vendor'});

const model = mongoose.model('Vendor', Vendor);
export default model;