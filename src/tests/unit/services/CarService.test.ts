import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import * as carsMock from '../mocks/carsMock';
import chaiAsPromised from 'chai-as-promised';
import { ZodError } from 'zod';
// import { errorCatalog } from '../../../errors/catalogErrors';

chai.use(chaiAsPromised)

const { expect } = chai;

describe('Tests de Cars SERVICE', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  beforeEach(async () => {
    sinon.stub(carModel, 'create').resolves(carsMock.correctCarWithId);
    // sinon.stub(carModel, 'read').resolves();
    // sinon.stub(carModel, 'readOne').resolves();
    // sinon.stub(carModel, 'update').resolves();
    // sinon.stub(carModel, 'destroy').resolves();
  });

  afterEach(()=>{
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
			} catch (err) {
				error = err;
			}

			expect(error).to.be.instanceOf(ZodError);
    })

  });
  // it('', async () => {});
  // it('', async () => {});
  // it('', async () => {});


});