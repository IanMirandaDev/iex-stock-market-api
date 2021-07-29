import 'dotenv/config';
import process from 'process';
import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import HomePageController from './app/controllers/HomePageController.js';

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs());

app.get('/', HomePageController.show);
app.get('/:symbol', HomePageController.updateQuoteData);

app.listen(port, () => console.log(`Server is running at port ${port}`));