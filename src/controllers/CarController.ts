import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarController {
  constructor(private _service:IService<ICar>) { }

  public create = async (req: Request, res:Response<ICar>) => {
    const createdCar = await this._service.create(req.body);
    return res.status(201).json(createdCar);
  };
}

export default CarController;