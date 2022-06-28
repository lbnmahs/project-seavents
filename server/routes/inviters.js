import express from 'express';
import { Inviter, validate } from '../models/inviters';
import bycrypt from 'bcrypt';

const router = express.Router();
router.post('/inviters/auth', async (req, res) => {

    try{
        const { error } = validate(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        const inviter = await Inviter.findOne({ email: req.body.email });
        if(inviter){
            return res.status(409).send({ message: 'Inviter already exists' });
        }
        const salt = await bycrypt.genSalt(process.env.SALT_ROUNDS);
        const hashedPassword = await bycrypt.hash(req.body.password, salt);
        await new inviter({ ...req.body, password: hashedPassword }).save();
        res.status(200).send({ message: 'Inviter created successfully' });

    }catch(err){
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' });
    }
    
});


export default router;