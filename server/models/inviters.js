import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import joi from 'joi'
import passwordComplexity from 'joi-password-complexity';

const inviterSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

inviterSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, { expiresIn: '7d' })
    return token
};

const Inviter = mongoose.model('Inviter', inviterSchema);

const validate = (data) => {
    const schema = joi.object({
        userName: joi.string().required().label('User Name'),
        email: joi.string().required().email().label('Email'),
        password: passwordComplexity().required().label('Password'),
    })
    return schema.validate(data)
}

export { Inviter, validate }