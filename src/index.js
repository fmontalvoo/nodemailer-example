import env from 'dotenv';

import cors from 'cors';
import express, { json } from 'express';

import sendMail from './mailer';

env.config();
const app = express();


app.use(json());
app.use(cors());

app.post('/send', (req, res) => {
    const data = req.body;
    sendMail(data);
    res.send(`Email enviado a ${data['to']}`);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});