const express = require('express');
const routes = express.Router();
const apiController = require('../controllers/apiController');
// console.log("API Routing Works..");

routes.post('/loginToken',apiController.loginToken);

module.exports = routes;