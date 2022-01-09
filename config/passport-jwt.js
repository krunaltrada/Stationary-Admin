const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'kuniyo'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log("error in finding user from JWT",err);
            return;
        }
        if(user){
            console.log(user);
            return done(err, user);
        }else{
            return done(null, false);
        }
    })
}))


module.exports = passport;