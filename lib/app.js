const express = require('express');
var cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/temptracker', require('./routes/front-end-routes'));
app.use('/', require('./routes/temp-network-route'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
