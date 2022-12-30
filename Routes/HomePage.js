import express from 'express';
export const Home = express.Router();
import ejs from 'ejs';
import { popular_videos ,oauth2client, user_subscriptions } from '../Functions/Youtube_Data.js';
Home.use(express.json());



Home
.get('/',async (req,res)=>{

    try {
        oauth2client.credentials = {
            access_token : req.user.accessToken,
            refresh_token : null,
        }
    
        let {result , nextpagetoken , prevpagetoken}= await popular_videos();
        let subs = await user_subscriptions();
        res.render('HomePage.ejs',{ profile : req.user.profile, items : result, nextpagetoken : nextpagetoken, prevpagetoken : prevpagetoken, queryvalue : "", subs : subs});
        
        // ejs.renderFile('./views/HomePage.ejs',{ profile : req.user.profile, items : result, nextpagetoken : nextpagetoken, prevpagetoken : prevpagetoken, queryvalue : "", subs : subs},{},(err,temp)=>{
        //     if (err) {
        //         throw err;
        //     } else {
        //         res.end(temp);
        //     }
        // });
           
    } catch (error) {
        if(error.response){
            if(error.response.data){
                if(error.response.data.error){
                        res.status(error.response.data.error.code).send(error.response.data.error.message);
                }
            }

        }
        else{
            res.send(error)
        }
    }
   

});

