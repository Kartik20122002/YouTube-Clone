import express from 'express';
export const videopage = express.Router();
import ejs from 'ejs';
import { get_videoAndChannel } from '../Functions/Youtube_Data.js';
videopage.use(express.json());



videopage
.get('/',async (req,res)=>{

   try {
      const videoId = req.query.v;
      const channelId = req.query.c;
   
      const {video , channel , relatedvideos} = await get_videoAndChannel(videoId,channelId);
   
      res.render('VideoPage.ejs',{relatedvideos: relatedvideos, video : video , channel : channel , queryvalue : "" , profile : req.user.profile});
   } catch (error) {
      res.send(error);
   }


})