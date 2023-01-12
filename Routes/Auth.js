import {clientId , clientSecret , redirectUrl , scopes } from '../Functions/GoogleAuth.js'
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import express from 'express';
import axios from 'axios';
import { connectDB , User } from '../DataBase/db.js';
export const Auth = express.Router();

const GoogleStrategy = Strategy;

export const isLoggedIn = (req,res,next)=>{
    req.user ? next() : res.render('LoginPage.ejs');
}

export const checktoken = async (req,res,next)=>{
    let access_token_details = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${req.user.accessToken}`)
    let expire_time = access_token_details.data.expires_in;

    if(expire_time < 300) console.log("Warning Warning");

    next();
}

passport.use(new GoogleStrategy({
    clientID : clientId,
    clientSecret : clientSecret,
    callbackURL : redirectUrl,
    scope : scopes,
},async (accessToken,refreshToken,profile,cb)=>{

    try {
    if(refreshToken != undefined ){

        let users = await User.find({GoogleId : profile.id});
        let user = users[0];
          
        if(users.length == 0){
                    let user = new User({
                            GoogleId : profile.id,
                            Name : profile.displayName,
                            RefreshToken : refreshToken,
                    })
            
                    const results = await user.save();
        }
        else{

        let personup = await User.updateOne(
        {GoogleId : profile.id} , 
        { $set : {RefreshToken : refreshToken} }
        );
        }
        
    }

    return cb(null,{profile,accessToken,refreshToken});
}
catch (err) {
    throw err;
}

}
));

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
.get('/signin',passport.authenticate('google',{accessType: 'offline'}))
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