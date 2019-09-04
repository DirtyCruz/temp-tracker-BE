const superagent = require('superagent');

function subscriber() {
  return superagent
    .post('http://temp.alchemycodelab.io/subscribe')
    .send({
      url: process.env.HOST
    })
    .then(res => {
      console.log(res.body);
    });
}

module.exports = subscriber;
