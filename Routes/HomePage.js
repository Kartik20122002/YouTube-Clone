import express from 'express';
export const Home = express.Router();
import ejs from 'ejs';
import { popular_videos ,oauth2client } from '../Functions/Youtube_Data.js';
Home.use(express.json());



Home
.get('/',async (req,res)=>{
   
    oauth2client.credentials = {
        access_token : req.user.accessToken,
        refresh_token : null,
    }

    let {result , nextpagetoken , prevpagetoken}= await popular_videos();

    ejs.renderFile('./views/HomePage.ejs',{items : result , nextpagetoken : nextpagetoken , prevpagetoken : prevpagetoken},{},(err,temp)=>{
        if (err) {
            throw err;
        } else {
            res.end(temp);
        }
    });
    
});

