require('dotenv').config();
require('./lib/utils/connect')();
const subscriber = require('./lib/utils/subscriber');

const app = require('./lib/app');

subscriber();

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
