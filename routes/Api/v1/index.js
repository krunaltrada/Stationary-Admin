const express = require('express');
const routes = express.Router();
const apiController = require('../../../controllers/Api/v1/index');

routes.get('/register',apiController.register);
console.log("Api/v1/index..");

module.exports = routes;