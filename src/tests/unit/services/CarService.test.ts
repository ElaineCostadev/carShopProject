import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import * as carsMock from '../mocks/carsMock';
import chaiAsPromised from 'chai-as-promised';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalogErrors';
// import { errorCatalog } from '../../../errors/catalogErrors';

chai.use(chaiAsPromised)

const { expect } = chai;

describe('Tests de Cars SERVICE', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carsMock.correctCarWithId);
    sinon.stub(carModel, 'read').resolves(carsMock.readAllCars);
    sinon.stub(carModel, 'readOne')
    .onCall(0).resolves(carsMock.correctCarWithId)
    .onCall(1).resolves(null);
    // sinon.stub(carModel, 'update').resolves();
    // sinon.stub(carModel, 'destroy').resolves();
  });

  after(()=>{
    sinon.restore();
  })

  describe('Inserindo(post) um novo Car', () => {
    it('Car criado com sucesso', async () => {
      const newCar = await carService.create(carsMock.correctCar);
      expect(newCar).to.be.deep.equal(carsMock.correctCarWithId)
    });
    it('Car não tem as propriedades necessarias - ZodError', async () => {
      let error;
			try {
				await carService.create({});
			} catch (err: unknown) {
				error = err;
			}

			expect(error).to.be.instanceOf(ZodError);
    })
  });

  describe('Procurando(getAll) - realAll de todos os Cars', () => {
    it('Cars encontrados com sucesso', async () => {
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal(carsMock.readAllCars)
    })
  });

  describe('Procurando(readOne) - readOne de um Car', () => {
    it('Apenas um Car encontrado com sucesso', async () => {
      const oneCar = await carService.readOne(carsMock.correctCarWithId._id);
      expect(oneCar).to.be.deep.equal(carsMock.correctCarWithId)
    })

    it('Quando não é encontrado um Car ', async () => {
      let error;
      try {
        await carService.readOne(carsMock.wrongCarWithId._id);
      } catch (err: any) {
        error = err;
      }
      // expect(error).not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound)
    })
  });

});
  // it('', async () => {});
  // it('', async () => {});
  // it('', async () => {});

