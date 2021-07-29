import 'dotenv/config';
import process from 'process';
import express from 'express';
import routes from './routes.js';
import path from 'path';
import exphbs from 'express-handlebars';
import sequelize from './database/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', routes);

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs());


app.listen(port, () => console.log(`Server is running at port ${port}`));