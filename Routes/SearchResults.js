import express from 'express';
import { search_videos ,user_subscriptions } from '../Functions/Youtube_Data.js';
import { isLoggedIn } from './Auth.js';

export const SearchResults = express.Router();


SearchResults
.post('/',isLoggedIn, async (req,res)=>{  
      try {
      let {result , nextpagetoken , prevpagetoken} = await search_videos(req.body.searchquery);
      let {subs} = await user_subscriptions();

     res.render('SearchPage.ejs',{ profile : req.user.profile, items : result ,nextpagetoken : nextpagetoken, prevpagetoken : prevpagetoken, queryvalue :req.body.searchquery, subs : subs});


      }
      catch(error){
        res.render('ErrorPage.ejs',{error : error});
      }

     
});
