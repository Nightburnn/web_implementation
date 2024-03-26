import express from 'express';
import {createAccount, getAllAccounts, getAccountById, updateAccount, deleteAccount } from '../controllers/accountController.js';
import passport from 'passport';
import '../strategies/localStrategy.js';
import authProtect from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authProtect, createAccount);
router.delete('/delete/:id', authProtect, deleteAccount)
router.get('/', authProtect, getAllAccounts)
router.get('/:id', authProtect, getAccountById)
router.patch('/:id', authProtect, updateAccount)


export default router;