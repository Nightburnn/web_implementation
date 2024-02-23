import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


export const register = asyncHandler(
  async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
   
    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error('password must be up to 6 characters');
    }
    // check if a user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
      throw new Error('Email already been registered');
    } else {
        const user = await User.create({
            firstName,
            lastName,
            email,
            password
          });
      
          res.status(201).json(user);
    }
  });
