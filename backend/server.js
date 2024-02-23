import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
