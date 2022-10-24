import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import * as carsMock from '../mocks/carsMock';
import CarModel from '../../../models/CarModel';
const { expect } = chai;

describe('Teste de Cars MODEL', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carsMock.correctCarWithId);
    sinon.stub(Model, 'find').resolves(carsMock.readAllCars);
    // sinon.stub(Model, 'find').resolves([]);
    // sinon.stub(Model, 'findOne').resolves();
    // sinon.stub(Model, 'findByIdAndUpdate').resolves();
    // sinon.stub(Model, 'findByIdAndDelete').resolves();
  });

  after(()=>{
    sinon.restore();
  })

  describe('Inserindo(post) um novo Car', () => {
    it('Car criado com sucesso', async () => {
      const newCar = await carModel.create(carsMock.correctCar);
      expect(newCar).to.be.deep.equal(carsMock.correctCarWithId)
    })
  });

  describe('Procurando(getAll) - realAll de todos os Cars', () => {
    it('Cars encontrados com sucesso', async () => {
      const newCar = await carModel.read();
      expect(newCar).to.be.deep.equal(carsMock.readAllCars)
    })
  });

  // describe('Procurando todos os cars(find)', () => {
  //   it('Encontrando um array de todos os Car com sucesso', async () => {
     
  //   })
  // });

  // describe('Procurando Um o car(findOne)', () => {
  //   it('Encontrando um objeto com apenas um Car com sucesso', async () => {
     
  //   })

  //   it('Quando Não é Encontrado um objeto, ID de Car valido', async () => {
     
  //   })
  // });


});