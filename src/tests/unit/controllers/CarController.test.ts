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
  });

  afterEach(() =>{
    sinon.restore();
  })

  describe('Inserindo(post) um novo Car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carsMock.correctCar);
    });

    it('Car criado com sucesso', async () => {
      req.body = carsMock.correctCar;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true

      const jsonStub = res.json  as sinon.SinonStub;     
      expect(jsonStub.calledWith(carsMock.correctCar)).to.be.true;
    })

  });


});