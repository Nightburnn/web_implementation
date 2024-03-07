import express from 'express';
import { register, login, logout, getUserProfile } from '../controllers/userController.js';
import passport from 'passport';
import '../strategies/localStrategy.js';
import authProtect from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authProtect, logout);
router.get('/dashboard', getUserProfile);

export default router;