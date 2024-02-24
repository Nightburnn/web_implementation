import express from 'express';
import { register, login, logout, getUserById } from '../controllers/userController.js';
import passport from 'passport';
import '../strategies/localStrategy.js';
import authProtect from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local'), login);
router.get('/logout', authProtect, logout);
router.get('/:id', authProtect, getUserById);

export default router;