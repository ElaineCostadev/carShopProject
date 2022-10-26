import { ErrorTypes } from '../errors/catalogErrors';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycleZodShema } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  private _moto: IModel<IMotorcycle>;
  constructor(model: IModel<IMotorcycle>) {
    this._moto = model;
  }

  public create = async (obj: unknown):Promise<IMotorcycle> => {
    const checkObjZod = motorcycleZodShema.safeParse(obj);

    if (!checkObjZod.success) throw checkObjZod.error;

    return this._moto.create(checkObjZod.data);
  };

  public read = async ():Promise<IMotorcycle[]> => this._moto.read();
  
  public readOne = async (_id:string):Promise<IMotorcycle> => {
    const oneMotorcyle = await this._moto.readOne(_id);

    if (!oneMotorcyle) throw new Error(ErrorTypes.ObjectNotFound);

    return oneMotorcyle;
  };

  public update = async (_id: string, obj: Partial<IMotorcycle>):Promise<IMotorcycle> => {
    const checkObjZod = motorcycleZodShema.safeParse(obj);
    
    if (!checkObjZod.success) throw checkObjZod.error;
    
    const motorcycleUpdated = await this._moto.update(_id, checkObjZod.data);
    
    if (!motorcycleUpdated) throw new Error(ErrorTypes.ObjectNotFound); 
    
    return motorcycleUpdated;
  };

  public delete = async (_id:string):Promise<IMotorcycle> => {
    const oneMotorcyle = await this._moto.delete(_id);

    if (!oneMotorcyle) throw new Error(ErrorTypes.ObjectNotFound);
    return oneMotorcyle;
  };
}
export default MotorcycleService;

// read():Promise<T[]>,
//   readOne(_id:string):Promise<T>,
//   update(_id:string, obj:unknown):Promise<T>,
//   delete(_id:string):Promise<T>,