const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

authRouter.post('/signup', async (req, res) => {
    try {
       //check whether password and confirmPassword are same
         if (req.body.password !== req.body.confirmPassword) {
              return res.status(400).json({ message: 'Password and Confirm Password must match' });
         }
        
        //check whether username already exists


        //create user
        const user = await User.create(req.body);
        res.status(200).json({ user });




    } catch (error) {
        res.status(500).json({ error });
    }});
