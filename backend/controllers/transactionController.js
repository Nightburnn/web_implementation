import asyncHandler from 'express-async-handler';
import Transaction from '../models/transactionModel.js';

export const createTransaction = asyncHandler(async (req, res) => {
  try {
    const { bank_name, account_number, transactions } = req.body;
    const newTransaction = await Transaction.create({ bank_name, account_number, transactions });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export const getAllTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export const getTransactionById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export const updateTransaction = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { bank_name, account_number, transactions } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, { bank_name, account_number, transactions }, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export const getTransactionsByAccountNumber = asyncHandler(async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const transactions = await Transaction.find({ "transactions.account_number": accountNumber });
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found for the given account number' });
    }
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
