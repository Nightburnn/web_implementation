import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  bank_name: String,
  account_number: String,
  transactions: [{
    date: Date,
    description: String,
    amount: Number,
    currency: String
  }],
  summary: {
    income: {
      total: Number,
      currency: String
    },
    expenses: {
      total: Number,
      currency: String
    },
    savings: {
      total: Number,
      currency: String
    }
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);


export default Transaction;
