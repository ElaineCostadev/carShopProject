import { Router } from 'express';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleController from '../controllers/MotorcyleController';

const MOTORCYCLE_ID = '/motorcycles/:id';

const motorcycleRoute = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRoute.post('/motorcycles', motorcycleController.create);
motorcycleRoute.get('/motorcycles', motorcycleController.read);
motorcycleRoute.get(MOTORCYCLE_ID, motorcycleController.readOne);
motorcycleRoute.put(MOTORCYCLE_ID, motorcycleController.update);
motorcycleRoute.delete(MOTORCYCLE_ID, motorcycleController.delete);


export default motorcycleRoute;