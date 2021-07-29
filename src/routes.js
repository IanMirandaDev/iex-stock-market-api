import Router from 'express';
import HomePageController from './app/controllers/HomePageController.js';

const routes = Router();

routes.get('/home', HomePageController.show);

export default routes;