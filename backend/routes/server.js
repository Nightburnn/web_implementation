const express = require('express');
const app = express();
require('dotenv').config();
const transactionController = require('./controllers/transactionController');
const accountController = require('./controllers/accountController');

// Transaction Routes
app.post('/api/transactions', transactionController.createTransaction);
app.get('/api/transactions', transactionController.getAllTransactions);
app.get('/api/transactions/:id', transactionController.getTransactionById);
app.put('/api/transactions/:id', transactionController.updateTransaction);
app.delete('/api/transactions/:id', transactionController.deleteTransaction);

// Account Routes
app.post('/api/accounts', accountController.createAccount);
app.get('/api/accounts', accountController.getAllAccounts);
app.get('/api/accounts/:id', accountController.getAccountById);
app.put('/api/accounts/:id', accountController.updateAccount);
app.delete('/api/accounts/:id', accountController.deleteAccount);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
