import express from 'express';
export const Home = express.Router();
import { popular_videos ,oauth2client, user_subscriptions } from '../Functions/Youtube_Data.js';
Home.use(express.json());



Home
.get('/',async (req,res)=>{

    try {
        oauth2client.credentials = {
            access_token : req.user.accessToken,
            refresh_token : req.user.refreshToken,
        }

        if(req.user.accessToken == null) throw new Error("Access Token can not be obtained");
    
        let {result , nextpagetoken , prevpagetoken}= await popular_videos();
        let {subs} = await user_subscriptions();

        if(!result || !subs) throw new Error("Required Data can not be obtained");
        res.render('HomePage.ejs',{ profile : req.user.profile, items : result, nextpagetoken : nextpagetoken, prevpagetoken : prevpagetoken, queryvalue : "", subs : subs});
     
    } catch (error) {
        res.render('ErrorPage.ejs',{error : error});
    }
   

});

