const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use(new FacebookStrategy({
    clientID : "328534085681126",
    clientSecret : "d86ffc8e8aad30de3cb4c8bfc27e7877",
    callbackURL : "http://localhost:8004/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done){
    User.findOne({facebookId : profile.id }).exec(function(err, user){
        if(err){
            console.log('error in facebook strategy-passport',err); return false;
        }
        console.log(profile);
        if(user){
            return done(null, user);
        }else{
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error in creating user facebook passport-strategy',err);
                    return; 
                }
                return done(null,user);
            })
        }
    })
}));

module.exports = passport;