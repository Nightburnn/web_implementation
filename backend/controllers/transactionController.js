const Transaction = require('../models/transactionModel');

// Function to create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { bank_name, account_number, transactions } = req.body;
    const newTransaction = await Transaction.create({ bank_name, account_number, transactions });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to get a transaction by ID
exports.getTransactionById = async (req, res) => {
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
};

// Function to update a transaction
exports.updateTransaction = async (req, res) => {
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
};

// Function to delete a transaction
exports.deleteTransaction = async (req, res) => {
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
};
