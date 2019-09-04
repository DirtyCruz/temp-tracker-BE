require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Location = require('../lib/models/Location');

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

  it('it returns the status 204', () => {
    return request(app)
      .get('/status')
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });

  it('it can create a location', () => {
    return request(app)
      .post('/register')
      .send({
        name: 'Mars'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
        });
      });
  });

  it('it can delete a location', async() => {
    const location = await Location.create({
      name: 'Mars'
    });

    return request(app)
      .delete(`/deregister/${location._id}`)
      .then(res => {
        const cleaned_id = JSON.parse(JSON.stringify(location._id));
        expect(res.body).toEqual({ id: cleaned_id });
      });
  });
});
