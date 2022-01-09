const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/homeController');
const passport = require('passport');

routes.use('/api',require('./api'));
routes.use('/apiFolder',require('./Api/'));

routes.get('/', homeController.register);
routes.post('/registerUser', homeController.registerUser);
routes.get('/login', homeController.login);
routes.post('/loginUser', passport.authenticate('local',{failureRedirect:'/login'}),homeController.loginUser);
routes.get('/dashboard', passport.checkAuthentication, homeController.dashboard);
routes.get('/logout', homeController.logout);
routes.get('/formsBasic', passport.checkAuthentication, homeController.formsBasic);

routes.get('/auth/google', passport.authenticate('google', {scope : ['profile','email']}));
routes.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/login'}), homeController.loginUser);

routes.get('/auth/facebook',passport.authenticate('facebook'));
routes.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }), homeController.loginUser);

routes.post('/apiRegister', homeController.apiRegister);
routes.get('/getRegister', homeController.getRegister);
// routes.get('/delRegister/:id', homeController.delRegister);

routes.delete('/delRegister/:id',passport.authenticate('jwt',{session:false}), homeController.delRegister);

routes.get('/apiRegisterJWT', homeController.apiRegisterJWT);

routes.get('/lostPassword',homeController.lostPassword);
routes.post('/checkEmail',homeController.checkEmail);
routes.get('/otp',homeController.otp);
routes.post('/checkOtp',homeController.checkOtp);
routes.get('/newPassword',homeController.newPassword);
routes.post('/newPasswordDB',homeController.newPasswordDB);

routes.get('/postData', homeController.postData);
routes.post('/postCreate', homeController.postCreate);
routes.post('/commentCreate', homeController.commentCreate);

module.exports = routes;