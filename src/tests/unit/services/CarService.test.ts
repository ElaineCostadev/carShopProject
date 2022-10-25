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

  afterEach(()=>{
    sinon.restore();
  })

  describe('Inserindo(post) um novo Car', () => {
    it('Car criado com sucesso', async () => {
      sinon.stub(carModel, 'create').resolves(carsMock.correctCarWithId);
  
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
      sinon.stub(carModel, 'read').resolves(carsMock.readAllCars);

      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal(carsMock.readAllCars)
    })
  });

  describe('Procurando(readOne) - readOne de um Car', () => {
    it('Apenas um Car encontrado com sucesso', async () => {
      sinon.stub(carModel, 'readOne').resolves(carsMock.correctCarWithId)

      const oneCar = await carService.readOne(carsMock.correctCarWithId._id);
      expect(oneCar).to.be.deep.equal(carsMock.correctCarWithId)
    })

    it('Quando não é encontrado um Car ', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);

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

  describe('Atualizando(update) - um Car', () => {
    it('Apenas um Car atualizado com sucesso', async () => {
      sinon.stub(carModel, 'update').resolves(carsMock.updateCarWithId);

      const oneCar = await carService.update(carsMock.correctCarWithId._id, carsMock.updatedCar);
      expect(oneCar).to.be.deep.equal(carsMock.updateCarWithId)
    })

    it('Quando o obj enviado não é valido - ZodError ', async () => {
      let error;
      try {
        await carService.update(carsMock.correctCarWithId._id, carsMock.noYearCar);
      } catch (err: any) {
        error = err;
      }
      // expect(error).not.to.be.undefined;
      expect(error).to.be.instanceOf(ZodError);
    })

    it('Quando não é encontrado um Car ', async () => {
      sinon.stub(carModel, 'update').resolves(null);
      let error;
      try {
        await carService.update(carsMock.wrongCarWithId._id, carsMock.updatedCar);
      } catch (err: any) {
        error = err;
      }
      // expect(error).not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound)
    })
  });

  describe('Deletando(delete) - um Car', () => {
    it('Apenas um Car deletado com sucesso', async () => {
      sinon.stub(carModel, 'delete').resolves(carsMock.correctCarWithId);

      const oneCar = await carService.delete(carsMock.correctCarWithId._id);
      expect(oneCar).to.be.deep.equal(carsMock.correctCarWithId)
    })

    it('Quando não é encontrado um Car ', async () => {
      sinon.stub(carModel, 'delete').resolves(null);
      let error;
      try {
        await carService.delete(carsMock.wrongCarWithId._id);
      } catch (err: any) {
        error = err;
      }
      expect(error).not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound)
    })
  });

  

});

