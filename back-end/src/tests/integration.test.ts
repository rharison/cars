import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  MESSAGE_ERROR_REQUIRED_FIELD,
  messageErrorInvalidByField
} from '@validation/car';
import { MESSAGE_ERROR_INVALID_ID } from '@validation/id';
import { v4 as uuidV4 } from 'uuid'

chai.use(chaiHttp);
const should = chai.should();
const BASE_URL = 'http://localhost:3333';


describe('Car API', () => {
  let carId = 0;
  const body = {
    "car": {
      "placa": "ABC-1234",
      "chassi": "12345678a",
      "modelo": "uno",
      "marca": "fiat",
      "ano": 1886
    }
  }

  describe('/POST Car', () => {
    it('Verify registration of a valid new car', (done) => {
      chai.request(BASE_URL)
        .post('/cars')
        .send(body)
        .end((err, res) => {
          carId = res.body.id;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('placa').eql(body.car.placa);
          res.body.should.have.property('chassi').eql(body.car.chassi);
          res.body.should.have.property('modelo').eql(body.car.modelo);
          res.body.should.have.property('marca').eql(body.car.marca);
          res.body.should.have.property('ano').eql(body.car.ano);
          done();
        });
    });

    it('Check if it returns an error for a car that already exists in the database when trying to castrate a car with the same license plate or chassis twice', (done) => {
      chai.request(BASE_URL)
        .post('/cars')
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Car already exists');
          done();
        });
    });

    const bodyWithInvalidPlaca = {
      "car": {
        ...body.car,
        "placa": "ABC-12345###"
      }
    }

    it('Check if there will be an error when trying to register a car with all the data, but with one of them invalid', (done) => {
      chai.request(BASE_URL)
        .post('/cars')
        .send(bodyWithInvalidPlaca)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.fields.should.be.a('array');
          res.body.fields[0].should.be.a('object');
          res.body.fields[0].should.have.property('field').eql('placa');
          res.body.fields[0].should.have.property('message').eql(messageErrorInvalidByField.placa);
          res.body.should.have.property('message').eql('These fields are invalids');
          done();
        });
    });

    const bodyWitouthPlaca = {
      "car": {
        ...body.car,
        "placa": undefined
      }
    }

    it('Check if there will be an error when trying to create a car without mandatory data', (done) => {
      chai.request(BASE_URL)
        .post('/cars')
        .send(bodyWitouthPlaca)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.fields.should.be.a('array');
          res.body.fields[0].should.be.a('string').eql('placa');
          res.body.should.have.property('message').eql(MESSAGE_ERROR_REQUIRED_FIELD);
          done();
        });
    });


    const bodyWitouthCar = {}

    it('Check if there will be an error when trying to register a car without the car object', (done) => {
      chai.request(BASE_URL)
        .post('/cars')
        .send(bodyWitouthCar)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql("The 'car' property is required");
          done();
        });
    });
  });

  describe('/GET/:id Car', () => {
    it('Check if the car is in the database', (done) => {
      chai.request(BASE_URL)
        .get(`/cars/${carId}`)
        .end((err, res) => {
          carId = res.body.id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(carId);
          res.body.should.have.property('placa').eql(body.car.placa);
          res.body.should.have.property('chassi').eql(body.car.chassi);
          res.body.should.have.property('modelo').eql(body.car.modelo);
          res.body.should.have.property('marca').eql(body.car.marca);
          res.body.should.have.property('ano').eql(body.car.ano);
          done();
        });
    });

    //Check if it returns an error when trying to query a car whose id is not a valid UUID

    it('Check if it returns an error when trying to query a car whose id is not a valid UUID', (done) => {
      chai.request(BASE_URL)
        .get(`/cars/123`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.fields.should.be.a('array');
          res.body.fields[0].should.have.property('field').eql('id');
          res.body.fields[0].should.have.property('message').eql(MESSAGE_ERROR_INVALID_ID);
          done();
        });
    });

    it('Check if not found error will be returned when trying to search for a car with an unregistered id', (done) => {
      chai.request(BASE_URL)
        .get(`/cars/${uuidV4()}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Car not found');
          done();
        });
    });

  });

  const newBody = {
    car: {
      placa: "DEF-5678",
      chassi: "98765432AAA",
      modelo: "Onix",
      marca: "Chevrolet",
      ano: 2023,
    }
  }

  describe('/PUT/:id Car', () => {
    it('Check car data change', (done) => {
      chai.request(BASE_URL)
        .put(`/cars/${carId}`)
        .send(newBody)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a('string').eql('Car updated');
          done();
        });
    });

    it('Check if it returns an error when trying to change a car whose id is not a valid UUID', (done) => {
      chai.request(BASE_URL)
        .put(`/cars/123`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.fields.should.be.a('array');
          res.body.fields[0].should.have.property('field').eql('id');
          res.body.fields[0].should.have.property('message').eql(MESSAGE_ERROR_INVALID_ID);
          done();
        });
    });

    it('Check if not found error will be returned when trying to change for a car with an unregistered id', (done) => {
      chai.request(BASE_URL)
        .put(`/cars/${uuidV4()}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Car not found');
          done();
        });
    });
  });

  describe('/GET/:id Car', () => {
    it('Check if the car is in the database after change', (done) => {
      chai.request(BASE_URL)
        .get(`/cars/${carId}`)
        .end((err, res) => {
          carId = res.body.id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(carId);
          res.body.should.have.property('placa').eql(newBody.car.placa);
          res.body.should.have.property('chassi').eql(newBody.car.chassi);
          res.body.should.have.property('modelo').eql(newBody.car.modelo);
          res.body.should.have.property('marca').eql(newBody.car.marca);
          res.body.should.have.property('ano').eql(newBody.car.ano);
          done();
        });
    });
  });

  describe('/GET Car', () => {
    it('Check if the return is correct when searching for all cars', (done) => {
      chai.request(BASE_URL)
        .get(`/cars`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.at.least(1);
          res.body[0].should.have.property('id').eql(carId);
          res.body[0].should.have.property('placa').eql(newBody.car.placa);
          res.body[0].should.have.property('chassi').eql(newBody.car.chassi);
          res.body[0].should.have.property('modelo').eql(newBody.car.modelo);
          res.body[0].should.have.property('marca').eql(newBody.car.marca);
          res.body[0].should.have.property('ano').eql(newBody.car.ano);
          done();
        });
    });
  });

  describe('/DELETE/:id Car', () => {
    it('Checking the deletion of a car', (done) => {
      chai.request(BASE_URL)
        .delete(`/cars/${carId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a('string').eql('Car deleted');
          done();
        });
    });

    it('Check if it returns an error when trying to delete a car whose id is not a valid UUID', (done) => {
      chai.request(BASE_URL)
        .delete(`/cars/123`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.fields.should.be.a('array');
          res.body.fields[0].should.have.property('field').eql('id');
          res.body.fields[0].should.have.property('message').eql(MESSAGE_ERROR_INVALID_ID);
          done();
        });
    });

    it('Check if not found error will be returned when trying to delete for a car with an unregistered id', (done) => {
      chai.request(BASE_URL)
        .delete(`/cars/${uuidV4()}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Car not found');
          done();
        });
    });
  });

  describe('/GET/:id Car', () => {
    it('Checking if the car was really deleted', (done) => {
      chai.request(BASE_URL)
        .get(`/cars/${carId}`)
        .end((err, res) => {
          carId = res.body.id;
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Car not found');
          done();
        });
    });
  });

  describe('/GET Car', () => {
    it('Check if the return is correct when searching for all cars', (done) => {
      chai.request(BASE_URL)
        .get(`/cars`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

});