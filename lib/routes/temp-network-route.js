const { Router } = require('express');
const Location = require('../models/Location');

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
  });

  
