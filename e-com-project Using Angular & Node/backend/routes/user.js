const express = require('express');
const router = express.Router();
const User = require('../db/user');


router.post('/' , async (req , res , next)=>{
    try{
        const {name,email,password,isAdmin} = req.body;
        if(!name){
              return res.status(400).json({ message: 'Name is required' });
        }
        else if(!email){
              return res.status(400).json({ message: 'Email is required' });
        }
        else if(!password){
              return res.status(400).json({ message: 'Password is required' });
        }
        
        const user = await User.create({name,email,password,isAdmin});

        res.status(201).json(user.toObject());

        console.log(user);
        
    }
    catch(err){
        next(err);
    }
})
module.exports = router;