import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { ErrorTypes } from '../errors/catalogErrors';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;
  constructor(model:Model<T>) {
    this._model = model;
  }

  public create = async (obj: T): Promise<T> => this._model.create({ ...obj });

  public read = async (): Promise<T[]> => this._model.find();

  public readOne = async (_id: string): Promise<T | null> => {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    return this._model.findOne({ _id });
  };

  public update = async (_id: string, obj: Partial<T>): Promise<T | null> => {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    
    return this._model.findByIdAndUpdate({ _id }, { ...obj } as UpdateQuery<T>, { new: true });
  };

  public destroy = async (_id: string): Promise<T | null> => {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    return this._model.findByIdAndDelete({ _id });
  };
}

export default MongoModel;