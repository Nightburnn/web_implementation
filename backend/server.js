import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    `Server is listening on http:localhost:${PORT}`
});
