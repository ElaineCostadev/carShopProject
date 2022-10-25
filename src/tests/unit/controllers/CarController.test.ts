import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { Request, Response } from 'express';
import * as carsMock from '../mocks/carsMock';
const { expect } = chai;

describe('Tests de Cars CONTROLLER', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  afterEach(() =>{
    sinon.restore();
  })

  describe('Inserindo(post) um novo Car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carsMock.correctCar);
    });

    afterEach(() =>{
      sinon.restore();
    })

    it('Car criado com sucesso', async () => {
      req.body = carsMock.correctCar;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true

      const jsonStub = res.json  as sinon.SinonStub;     
      expect(jsonStub.calledWith(carsMock.correctCar)).to.be.true;
    })

  });

  describe('Procurando(getAll) - readAll de todos os Cars', () => {
    beforeEach(() => {
      sinon.stub(carService, 'read').resolves(carsMock.readAllCars);
    });

    afterEach(() =>{
      sinon.restore();
    });
    
    it('Cars encontrados com sucesso', async () => {
      await carController.read(req, res);
      
      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true

      const jsonStub = res.json  as sinon.SinonStub;     
      expect(jsonStub.calledWith(carsMock.readAllCars)).to.be.true;
    })
  });

  describe('Procurando(readOne) - readOne de apenas um Car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'readOne').resolves(carsMock.correctCarWithId);
    });

    afterEach(() =>{
      sinon.restore();
    });
    
    it('Apenas um Car encontrado com sucesso', async () => {
      req.params = { id: carsMock.correctCarWithId._id };
      await carController.readOne(req, res);
      
      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true

      const jsonStub = res.json  as sinon.SinonStub;     
      expect(jsonStub.calledWith(carsMock.correctCarWithId)).to.be.true;
    })
  });

  describe('Atualizandoi(update) - de apenas um Car', () => {
    it('Apenas um Car encontrado com sucesso', async () => {

      sinon.stub(carService, 'update').resolves(carsMock.updateCarWithId);
      req.params = { id: carsMock.correctCarWithId._id };
      req.body = carsMock.updatedCar;

      await carController.update(req, res);
      
      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true

      const jsonStub = res.json  as sinon.SinonStub;     
      expect(jsonStub.calledWith(carsMock.updateCarWithId)).to.be.true;
    })
  });

  describe('Deletando(delete) - de apenas um Car', () => {
    it('Apenas um Car deletado com sucesso', async () => {

      sinon.stub(carService, 'delete').resolves(carsMock.correctCarWithId);
      req.params = { id: carsMock.correctCarWithId._id };

      await carController.delete(req, res);
      
      const statusStub = res.status as sinon.SinonStub;
      
      expect(statusStub.calledWith(204)).to.be.true

      // const jsonStub = res.json  as sinon.SinonStub;     
      // expect(jsonStub.calledWith(carsMock.correctCarWithId)).to.be.true;
    })
  });

});
