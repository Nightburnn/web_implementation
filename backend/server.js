import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import dbConnect from './config/database.js';
import errorHandler from './middleware/errors.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import userRoutes from './routes/user.js';
import newsController from './controllers/newsController.js';
import transactionController from './controllers/transactionController.js';
import accountController from './controllers/accountController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // Go up one level

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// Define your API routes
app.use('/api/users', userRoutes);

// A simple route to say hello from the server side
app.get('/', (req, res) => {
  res.send('Hello from the server side!');
});
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
// Error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server is listening on: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
