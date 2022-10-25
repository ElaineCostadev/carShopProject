import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarController {
  constructor(private _service:IService<ICar>) { }

  public create = async (req: Request, res:Response<ICar>) => {
    const createdCar = await this._service.create(req.body);
    return res.status(201).json(createdCar);
  };

  public read = async (_req: Request, res:Response<ICar[]>) => {
    const readAll = await this._service.read();
    return res.status(200).json(readAll);
  };

  public readOne = async (req: Request, res:Response<ICar>) => {
    const { id } = req.params;
    
    const readOne = await this._service.readOne(id);
    return res.status(200).json(readOne);
  };

  public update = async (req: Request, res:Response<ICar>) => {
    const { id } = req.params;
    const obj = req.body;
    const updateObject = await this._service.update(id, obj);
    return res.status(200).json(updateObject);
  };

  public delete = async (req: Request, res:Response<ICar>) => {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  };
}

export default CarController;