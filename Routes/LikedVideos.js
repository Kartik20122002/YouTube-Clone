import express from 'express';
export const Liked_Page = express.Router();
import { liked_videos , user_subscriptions } from '../Functions/Youtube_Data.js';
Liked_Page.use(express.json());



Liked_Page
.get('/',async (req,res)=>{

    try {
        
        let {liked , nextpagetoken , prevpagetoken}= await liked_videos("");

        let {subs} = await user_subscriptions();
        res.render('LikedPage.ejs',{ profile : req.user.profile, items : liked, nextpagetoken : nextpagetoken, prevpagetoken : prevpagetoken, queryvalue : "", subs : subs});
           
    } catch (error) {
        res.render('ErrorPage.ejs',{error : error});
    }
   

});

