import express from 'express';
import { getChatGPTResponse } from './openai.js';

const app = express();
const PORT = 3000;

app.post('localhost:3000/api', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
