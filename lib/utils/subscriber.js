const superagent = require('superagent');

export default function subscriber() {
  superagent
    .post('http://temp.alchemycodelab.io/subscribe')
    .send({
      url: process.env.HOST
    });
}
