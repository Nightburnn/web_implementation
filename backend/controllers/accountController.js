import asyncHandler from 'express-async-handler';
import Account from '../models/accountModel.js';

export const createAccount = asyncHandler(async (req, res) => {
  try {
    const { bank_name, account_number, account_type, balance, currency, owner, opened_at } = req.body;
    const newAccount = await Account.create({ bank_name, account_number, account_type, balance, currency, owner, opened_at });
    res.status(201).json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export const getAllAccounts = asyncHandler(async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export const getAccountById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export const updateAccount = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { bank_name, account_number, account_type, balance, currency, owner, opened_at } = req.body;
    const updatedAccount = await Account.findByIdAndUpdate(id, { bank_name, account_number, account_type, balance, currency, owner, opened_at }, { new: true });
    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(updatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export const deleteAccount = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAccount = await Account.findByIdAndDelete(id);
    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
