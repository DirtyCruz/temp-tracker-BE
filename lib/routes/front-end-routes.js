const { Router } = require('express');
const Location = require('../models/Location');
const Temp = require('../models/Temp');

module.exports = Router()
  .get('/temps', (req, res, next) => {
    Temp.find()
      .then(temps => {
        res.send(temps);
      })
      .catch(next);
  })

  .get('/locations', (req, res, next) => {
    Location.find()
      .then(locals => {
        res.send(locals);
      })
      .catch(next);
  })

  .get('/temps-by-location/:id', (req, res, next) => {
    Temp.find({ location: req.params.id })
      .sort({ createdAt: -1 })
      .limit(10)
      .then(temps => {
        res.send(temps);
      })
      .catch(next);
  })

  .get('/get-latest-temps', (req, res, next) => {
    Temp.getLocationsWithLatestTemp()
      .then(locations => {
        res.send(locations);
      })
      .catch(next);
  });
