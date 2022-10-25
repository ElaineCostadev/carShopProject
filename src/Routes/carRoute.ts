import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

const carRoute = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoute.post('/cars', carController.create);
carRoute.get('/cars', carController.read);
carRoute.get('/cars/:id', carController.readOne);
carRoute.put('/cars/:id', carController.update);
carRoute.delete('/cars/:id', carController.delete);

export default carRoute;
