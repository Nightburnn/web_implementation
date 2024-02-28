import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400).json({ error: 'Please fill in all required fields' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters long' });
    return;
  }

  // Check if a user with the given email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: 'Email already registered' });
    return;
  }

  // Create a new user
  const user = await User.create({
    fullName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const login = asyncHandler(
	((req, res) => {
		res.status(200).json({ message: 'Login successful', user: req.user });
	})
)

export const logout = asyncHandler(
	((req, res) => {
		req.logout(() => res.status(200).json({ message: 'Logout successful' }));
	})
)

export const getUserById = asyncHandler(
  async (req, res) => {
  const userId = req.params.id;

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error('Invalid user ID format');
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json(user);
});