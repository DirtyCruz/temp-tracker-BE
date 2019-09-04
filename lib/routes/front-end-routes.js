const { Router } = require('express');
const Location = require('../models/Location');
const Temp = require('../models/Temp');

module.exports = Router()
  .get('/temps', (req, res, next) => {
    Temp
      .find()
      .then(temps => {
        res.send(temps);
      })
      .catch(next);
  })

  .get('/locations', (req, res, next) => {
    Location
      .find()
      .then(locals => {
        res.send(locals);
      })
      .catch(next);
  });
