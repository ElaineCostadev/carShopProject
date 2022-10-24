import { ErrorTypes } from '../errors/catalogErrors';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
// import IService from '../interfaces/IService';

class CarService /* implements IService<ICar>  */{
  private _car:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public create = async (obj: unknown):Promise<ICar> => {
    // recebemos uma variável qualquer, e garantimos que ela é um objeto com formato correto utilizando o zod
    const checkObj = carZodSchema.safeParse(obj);

    // agora, caso os tipos estejam errados (success = false), nós lançaremos um erro
    if (!checkObj.success) throw checkObj.error;
    
    return this._car.create(checkObj.data);
  };

  public read = async (): Promise<ICar[]> => this._car.read();

  public readOne = async (_id: string): Promise<ICar> => {
    const readOneCar = await this._car.readOne(_id);

    if (!readOneCar) throw new Error(ErrorTypes.ObjectNotFound);
    
    return readOneCar;
  };

  public update = async (_id: string, obj: Partial<ICar>): Promise<ICar> => {
    const checkObj = carZodSchema.safeParse(obj);
    if (!checkObj.success) throw checkObj.error;

    const updatedCar = await this._car.update(_id, checkObj.data);

    if (!updatedCar) throw new Error(ErrorTypes.ObjectNotFound);
    
    return updatedCar;
  };

  public destroy = async (_id: string): Promise<ICar> => {
    const deleteOnCar = await this._car.destroy(_id);

    if (!deleteOnCar) throw new Error(ErrorTypes.ObjectNotFound);

    return deleteOnCar;
  };
}

export default CarService;
