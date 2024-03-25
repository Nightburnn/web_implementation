const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  bank_name: String,
  account_number: { type: String, unique: true },
  account_type: String,
  balance: Number,
  currency: String,
  owner: String,
  openedAt: Date
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
