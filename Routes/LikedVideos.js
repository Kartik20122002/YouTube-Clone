import express from 'express';
export const Liked_Page = express.Router();
import ejs from 'ejs';
import { liked_videos , user_subscriptions } from '../Functions/Youtube_Data.js';
Liked_Page.use(express.json());



Liked_Page
.get('/',async (req,res)=>{

    try {
        
        let {liked , nextpagetoken , prevpagetoken}= await liked_videos("");

        let {subs} = await user_subscriptions();
        res.render('LikedPage.ejs',{ profile : req.user.profile, items : liked, nextpagetoken : nextpagetoken, prevpagetoken : prevpagetoken, queryvalue : "", subs : subs});
           
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

