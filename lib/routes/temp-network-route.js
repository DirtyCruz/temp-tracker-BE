const { Router } = require('express');
const Location = require('../models/Location');
const Temp = require('../models/Temp');

module.exports = Router()
  .get('/status', (req, res) => {
    res.status = 204;
    res.send(res.status);
  })

  .post('/register', (req, res, next) => {
    const { name } = req.body;

    Location
      .create({ name })
      .then(location => {
        const { _id } = location;
        res.send({ id: _id });
      })
      .catch(next);
  })

  .delete('/deregister', (req, res, next) => {
    const { id } = req.body;

    Location
      .findByIdAndDelete(id)
      .then(location => {
        res.send({ id: location._id });
      })
      .catch(next);
  })

  .post('/temp/:id', (req, res, next) => {
    const { temperature } = req.body;

    Temp
      .create({ temp: temperature, location: req.params.id })
      .then(temp => {
        res.send({ temperature: temp.temp });
      })
      .catch(next);
  });




  
