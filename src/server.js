import 'dotenv/config';
import process from 'process';
import express from 'express';

const app = express();
const port = process.env.SERVER_PORT;

app.listen(port, () => console.log(`Server is running at port ${port}`));