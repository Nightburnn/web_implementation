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

import userRoutes from './routes/user.js';

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
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);

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