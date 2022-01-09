const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const user = require('../models/user');
passport.use(new passportLocal(
    {usernameField:'email'},
    (email,password,done)=>{
        user.findOne({email: email},(err,user)=>{
            if(err){
                console.log("Email Not Found..!!");
                return done(null);
            }
            if(!user || user.password != password){
                console.log("Password Not Match..!!");
                return done(null,user);
            }
            return done(null,user);
        });
    }
));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    user.findById(id,(err,user)=>{
        if(err){
            return done(null,false);
        }
        return done(null,user);
    })
});


passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    return res.redirect('/login');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;