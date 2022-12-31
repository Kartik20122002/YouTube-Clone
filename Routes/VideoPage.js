import express from 'express';
export const videopage = express.Router();
import ejs from 'ejs';
import { getComments, getRating, get_videoAndChannel } from '../Functions/Youtube_Data.js';
videopage.use(express.json());



videopage
.get('/',async (req,res)=>{

   try {
      const videoId = req.query.v;
      const channelId = req.query.c;
   
      const {video , channel , relatedvideos} = await get_videoAndChannel(videoId,channelId);

      const comments = await getComments(videoId);

      const rating = await getRating(videoId);

      res.render('VideoPage.ejs',{
         comments: comments,
         relatedvideos: relatedvideos, 
         video : video , 
         rating : rating,
         channel : channel , 
         queryvalue : "" , 
         profile : req.user.profile
      });

   } catch (error) {
      res.send(error);
   }


})