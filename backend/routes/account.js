import express from 'express';
import {createAccount, getAllAccounts, getAccountById, updateAccount, deleteAccount } from '../controllers/accountController.js';
import passport from 'passport';
import '../strategies/localStrategy.js';



const router = express.Router();

router.post('/create',  createAccount);
router.delete('/delete/:id', deleteAccount)
router.get('/',  getAllAccounts)
router.get('/:id', getAccountById)
router.patch('/:id', updateAccount)


export default router;
