const express = require('express');
const app = express();
const path = require('path');
const port = 8004;
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFacebook = require('./config/passport-facebook-strategy');
const jwtStrategy = require('./config/passport-jwt');
const jsonwebtoken = require('jsonwebtoken');

const flash = require('connect-flash');
const customWare = require('./config/middleware');

app.use(express.urlencoded());
app.use(express.static('assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    name: "UserId",
    secret: "Some@thing",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(customWare.setFlash);

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Server Not Running..!!");
        return false;
    }
    console.log("Server Running On Port : ",port);
});