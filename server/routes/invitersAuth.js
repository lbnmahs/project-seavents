import express from 'express';
import joi from 'joi';
import { Inviter } from '../models/inviters';
import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/inviters/auth', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        const inviter = await Inviter.findOne({ email: req.body.email });
        if(!inviter){
            return res.status(400).send({ message: 'Inviter does not exist' });
        }
        const validPassword = await bcrypt.compare(req.body.password, inviter.password);
        if(!validPassword){
            return res.status(400).send({ message: 'Invalid password' });
        }
        const token = inviter.generateAuthToken();
        res.status(200).send({ data: token, message: 'Inviter logged in successfully' });
    }catch(err){
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' });
    }
})

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().required().email().label('Email'),
        password: joi.string().required().label('Password'),
    })
    return schema.validate(data)
}

export default router;