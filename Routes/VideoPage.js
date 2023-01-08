import express from 'express';
export const videopage = express.Router();
import ejs from 'ejs';
import { getComments, getRating, get_videoAndChannel, is_Subscribed, user_subscriptions } from '../Functions/Youtube_Data.js';
videopage.use(express.json());



videopage
.get('/',async (req,res)=>{

   try {
      const videoId = req.query.v;
      const channelId = req.query.c;
   
      let item0 = get_videoAndChannel(videoId,channelId);
      let item1 = getComments(videoId);
      let item2 = getRating(videoId);
      let item3 = is_Subscribed(channelId);
      let item4 = user_subscriptions();

      let results = await Promise.all([item0,item1,item2,item3,item4]);

      
      const {video , channel , relatedvideos} = results[0];
      const comments = results[1];
      const rating = results[2];
      const {flag , id} = results[3];
      const {subs} = results[4];
      


      res.render('VideoPage.ejs',{
         comments: comments,
         relatedvideos: relatedvideos, 
         video : video , 
         rating : rating,
         channel : channel , 
         isSubscribed : flag,
         subs : subs,
         sub_id : id,
         queryvalue : "" , 
         profile : req.user.profile
      });

   } catch (error) {
      res.send(error);
   }


})