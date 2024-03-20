const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  bankName: String,
  accountNumber: { type: String, unique: true },
  accountType: String,
  balance: Number,
  currency: String,
  owner: String,
  openedAt: Date
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
