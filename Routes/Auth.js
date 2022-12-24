import {clientId , clientSecret , redirectUrl , scopes } from '../Functions/GoogleAuth.js'
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import express from 'express';
export const Auth = express.Router();

const GoogleStrategy = Strategy;

export const isLoggedIn = (req,res,next)=>{
    req.user ? next() : res.render('LoginPage.ejs');
}

passport.use(new GoogleStrategy({
    clientID : clientId,
    clientSecret : clientSecret,
    callbackURL : redirectUrl,
    scope : scopes,
    access_type: 'offline'
},(accessToken,refreshToken,profile,cb)=>{
    return cb(null,{profile,accessToken,refreshToken});
}
));

passport.serializeUser((user,done)=>{
   return done(null,user);
});

passport.deserializeUser((user,done)=>{
   return done(null,user);
});

Auth
.get('/',(req,res)=>{
    res.render('LoginPage.ejs');
})
.get('/signin',passport.authenticate('google'))
.get('/callback?',passport.authenticate('google',({
    failureRedirect : '/googleauth' , failureMessage : true, successRedirect : '/'
})))
.get('/logout',(req,res)=>{
    req.logOut((err)=>{
        res.send(err);
    })
    res.redirect('/');
})