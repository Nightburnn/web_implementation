import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


export const registerUser = asyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body;
    // handle validation
    if (!name || !email || !password) {
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
      throw new Error('Email already been registered');
    }
    const user = await User.create({
      name,
      email,
      password
    });
  });
