import { model as mongooseCreateModel } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { motorcycleMongooseSchema } from '../utils/schemas';
import MongoModel from './MongoModel';

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', motorcycleMongooseSchema)) { 
    super(model);
  }
}

export default MotorcycleModel;
