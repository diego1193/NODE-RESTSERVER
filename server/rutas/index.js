const express = require('express');

const app = express();

app.use(require('./rutas'));

app.use(require('./login'));

module.exports = app;