const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use(new googleStrategy({
    clientID : "375147238543-mov1fe2bobqfcrj6kslsaes4msp2g0i7.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8004/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){
    User.findOne({email : profile.emails[0].value }).exec(function(err, user){
        if(err){
            console.log('error in google strategy-passport',err); return false;
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
                    console.log('error in creating user google passport-strategy',err);
                    return; 
                }
                return done(null,user);
            })
        }
    })
}));

module.exports = passport;