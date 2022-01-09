const express = require('express');
const routes = express.Router();

console.log("Api/index..");
routes.use('/v1',require('./v1/'));

module.exports = routes;