import {clientId , clientSecret , redirectUrl , scopes } from '../Functions/GoogleAuth.js'
import passport from 'passport';
import refresh from 'passport-oauth2-refresh';
import { Strategy } from 'passport-google-oauth20';
import express from 'express';
import axios from 'axios';
import { User } from '../DataBase/db.js';
import {oauth2client,youtube} from '../Functions/Youtube_Data.js';
export const Auth = express.Router();

const GoogleStrategy = Strategy;

export const isLoggedIn = (req,res,next)=>{
    req.user ? next() : res.render('LoginPage.ejs');
}


export const checktoken = async (req,res,next)=>{
try {
    let access_token_details = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${req.user.accessToken}`)
    let expire_time = access_token_details.data.expires_in;

    if(expire_time < 300){
        
        let refreshToken = req.user.refreshToken;
        let newaccessToken = await refresh.requestNewAccessToken(
            'google',
            refreshToken,
            function (err, accessToken, refreshToken) {
              if(err) throw err;
              else return accessToken;
            },
          );
          oauth2client.credentials = {
            access_token : newaccessToken,
            refresh_token : refreshToken
          }
          req.user.accessToken = newaccessToken;
    }
    next();

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
    let users = await User.find({GoogleId : profile.id});
    if(refreshToken != undefined ){
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
        { $set : {RefreshToken : refreshToken , LastVisitedOn: new Date() } }
        );
        }
        
    }
    else{
        if(users.length != 0){
            refreshToken = users[0].RefreshToken;
        }
    }

    return cb(null,{profile,accessToken,refreshToken});
}
catch (err) {
    throw err;
}

}
)

passport.use(Strategys);
refresh.use(Strategys);



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