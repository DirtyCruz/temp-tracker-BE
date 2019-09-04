require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Location = require('../lib/models/Location');
const Temp = require('../lib/models/Temp');

describe('temp-network-routes tests', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('it can return all temps', async() => {
    const location = await Location.create({
      name: 'Mars'
    });
    const temp1 = JSON.parse(JSON.stringify(await Temp.create({
      temp: 1000,
      location: location._id
    })));
    const temp2 = JSON.parse(JSON.stringify(await Temp.create({
      temp: 4,
      location: location._id
    })));

    return request(app)
      .get('/api/v1/temptracker/temps')
      .then(res=> {
        expect(res.body).toEqual([temp1, temp2]);
      });
  });

  it('can return all locations', async() => {
    const location1 = JSON.parse(JSON.stringify(await Location.create({
      name: 'Mars'
    })));
    const location2 = JSON.parse(JSON.stringify(await Location.create({
      name: 'Venus'
    })));
    
    return request(app)
      .get('/api/v1/temptracker/locations')
      .then(res=> {
        expect(res.body).toEqual([location1, location2]);
      });
  });
});
