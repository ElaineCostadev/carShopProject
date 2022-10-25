import * as sinon from 'sinon';
import chai from 'chai';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import * as carsMock from '../mocks/carsMock';
import CarModel from '../../../models/CarModel';
import { errorCatalog, ErrorTypes } from '../../../errors/catalogErrors';
const { expect } = chai;

describe('Teste de Cars MODEL', () => {
  const carModel = new CarModel();

  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(carsMock.correctCarWithId);
    sinon.stub(Model, 'find').resolves(carsMock.readAllCars);
    sinon.stub(Model, 'findOne').resolves(carsMock.correctCarWithId)
      .onCall(0).resolves(carsMock.correctCarWithId)
      .onCall(1).resolves(null);
      // sinon.stub(mongoose, 'isValidObjectId').rejects();
    // sinon.stub(Model, 'findByIdAndUpdate').resolves();
    // sinon.stub(Model, 'findByIdAndDelete').resolves();
  });

  afterEach(()=>{
    sinon.restore();
  })

  describe('Inserindo(post) um novo Car', () => {
    it('Car criado com sucesso', async () => {
      const newCar = await carModel.create(carsMock.correctCar);
      expect(newCar).to.be.deep.equal(carsMock.correctCarWithId)
    })
  });

  describe('Procurando(readAll) - realAll de todos os Cars', () => {
    it('Cars encontrados com sucesso', async () => {
      const newCar = await carModel.read();
      expect(newCar).to.be.deep.equal(carsMock.readAllCars)
    })
  });

  describe('Procurando(readOne) - realOne de apenas um Car', () => {
    it('Car encontrado com sucesso', async () => {
      const newCar = await carModel.readOne(carsMock.correctCarWithId._id);
      expect(newCar).to.be.deep.equal(carsMock.correctCarWithId)
    })

    it('Id do Car não é hexadecimal', async () => {

      let error;
      try {
        await carModel.readOne(carsMock.wrongCarWithId._id);
      } catch (err: any) {      
        error = err.message
      }
      expect(error).to.be.equal(ErrorTypes.InvalidMongoId)
    })

    
  });



});