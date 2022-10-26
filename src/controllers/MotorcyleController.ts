import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public create = async (req: Request, res: Response) => {
    const obj = req.body;
    const creatMoto = await this._service.create(obj);
    return res.status(201).json(creatMoto);
  };

  public read = async (_req: Request, res: Response) => {
    const readAllMoto = await this._service.read();
    return res.status(200).json(readAllMoto);
  };

  public readOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneMoto = await this._service.readOne(id);
    return res.status(200).json(oneMoto);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const objMoto = req.body;
    const updateMoto = await this._service.update(id, objMoto);
    return res.status(200).json(updateMoto);
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  };
}

export default MotorcycleController;
