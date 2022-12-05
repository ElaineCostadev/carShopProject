import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { correctMotorcycle, correctMotorcycleWithId } from '../mocks/motorcycleMock';

const { expect } = chai;

chai.use(chaiAsPromised);

describe('Teste de Motorcycle da MODEL', () => {
  const motorcycleModel = new MotorcycleModel();

  afterEach(() => sinon.restore());

  describe('Inserindo, criando (post) uma nova Moto', () => {
    it('Verifica se a moto foi criada com sucesso', async () => {
      sinon.stub(Model, 'create').resolves(correctMotorcycleWithId)

      const newMotorcycle = await motorcycleModel.create(correctMotorcycle);
      expect(newMotorcycle).to.be.deep.equal(correctMotorcycleWithId);
    });
  });
});