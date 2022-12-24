import express from 'express';
import { google } from 'googleapis';
import ejs from 'ejs';
import { clientId, clientSecret, redirectUrl } from '../Functions/GoogleAuth.js';
import { search_videos } from '../Functions/Youtube_Data.js';
import { isLoggedIn } from './Auth.js';

export const SearchResults = express.Router();
const OAuth2 = google.auth.OAuth2;



SearchResults
.post('/',isLoggedIn, async (req,res)=>{
  
     let {result , nextpagetoken , prevpagetoken} = await search_videos(req.body.searchquery);
     ejs.renderFile('./views/HomePage.ejs',{items : result , nextpagetoken : nextpagetoken , prevpagetoken : prevpagetoken},{},(err,temp)=>{
      if (err) {
          throw err;
      } else {
          res.end(temp);
      }
     });
});
