const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/temptracker', require('./routes/front-end-routes'));
app.use('/', require('./routes/temp-network-route'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
