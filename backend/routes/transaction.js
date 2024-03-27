import express from 'express';
import asyncHandler from 'express-async-handler';
import {createTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction,getTransactionsByAccountNumber} from '../controllers/transactionController.js';
  
const router = express.Router();

// Route to create a new transaction
router.post('/transactions', createTransaction); 

// Route to get all transactions
router.get('/transactions', getAllTransactions);

// Route to get a transaction by ID
router.get('/transactions/:id', getTransactionById);

// Route to update a transaction
router.put('/transactions/:id', updateTransaction);

// Route to delete a transaction
router.delete('/transactions/:id', deleteTransaction);

// Route to get transactions by account number
router.get('/transactions/account/:accountNumber', getTransactionsByAccountNumber);

export default router;
