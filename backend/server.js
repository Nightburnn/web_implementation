import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import dbConnect from './config/database.js';
import errorHandler from './middleware/errors.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));


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