const superagent = require('superagent');

function subscriber() {
  superagent
    .post('http://temp.alchemycodelab.io/subscribe')
    .send({
      url: process.env.HOST
    });
}

module.exports =  subscriber;
