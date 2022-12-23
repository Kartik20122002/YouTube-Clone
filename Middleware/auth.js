import {oauth2Client} from '../Functions/GoogleAuth.js';

export const Auth = (req,res,next)=>{
    try {
        if(oauth2Client.credentials.access_token){
          next();
        }
        else{
            res.render('LoginPage.ejs');
        }
    } catch (error) {
        res.send(error);
    }
};

