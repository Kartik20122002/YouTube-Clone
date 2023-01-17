import {clientId , clientSecret , redirectUrl , scopes } from '../Functions/GoogleAuth.js'
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import express from 'express';
import axios from 'axios';
export const Auth = express.Router();

const GoogleStrategy = Strategy;

export const isLoggedIn = (req,res,next)=>{
    req.user ? next() : res.redirect('/googleauth/signin');
}


export const checktoken = async (req,res,next)=>{
try {
    let access_token_details = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${req.user.accessToken}`)
    let expire_time = access_token_details.data.expires_in;

    if(expire_time < 100){

        res.redirect('/');
  
    }
    else next();

} catch (error) {
    res.render('ErrorPage.ejs',{error : error});
}

}

const Strategys = new GoogleStrategy({
    clientID : clientId,
    clientSecret : clientSecret,
    callbackURL : redirectUrl,
    scope : scopes,
},async (accessToken,refreshToken,profile,cb)=>{

    try {

    return cb(null,{profile,accessToken,refreshToken});
}
catch (err) {
    throw err;
}

}
)

passport.use(Strategys);



passport.serializeUser((user,done)=>{
   return done(null,user);
});

passport.deserializeUser((user,done)=>{
   return done(null,user);
});

// , prompt: 'consent'

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

// ,{accessType: 'offline'}