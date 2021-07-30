import 'dotenv/config';
import process from 'process';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import exphbs from 'express-handlebars';
import HomePageController from './app/controllers/HomePageController.js';
import SocketEventsController from './app/controllers/SocketEventsController.js';

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);
new SocketEventsController(io);

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs());

app.get('/', HomePageController.show);
app.get('/:symbol', HomePageController.showCompany);

server.listen(port, () => console.log(`Server is running at port ${port}`));