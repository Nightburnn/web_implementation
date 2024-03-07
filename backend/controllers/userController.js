import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import passport from 'passport';

export const register = asyncHandler(
  async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Email already been registered');
  }

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
    res.status(500);
    throw new Error('Internal server error');
  }
});

export const login = asyncHandler(
  ((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({message: info.message});
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({message: 'Login successful'});
      });
    })(req, res, next);
  })
);

export const logout = asyncHandler(
	((req, res) => {
		req.logout(() => res.status(200).json({ message: 'Logout successful' }));
	})
)

//Retrieve user profile using fullName
export const getUserProfile = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const user = await User.findById(userId);

  if (user) {
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/*
//Update user profile
export const updateUserProfile = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const user = await User.findById(userId);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//Delete user profile

export const deleteUserProfile = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const user = await User.findById(userId);

  if (user) {
    await user.remove();
    res.status(200).json({ message: 'User removed' });
  }
  else {
    res.status(404);
    throw new Error('User not found');
  }
}
);
*/