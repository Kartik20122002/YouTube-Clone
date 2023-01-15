import express from 'express';
export const OtherLikePage = express.Router();
import ejs from 'ejs';
import { liked_videos } from '../Functions/Youtube_Data.js';
OtherLikePage.use(express.json());



OtherLikePage
.get('/',async (req,res)=>{

    try {
    
        let {liked , nextpagetoken}= await liked_videos(req.query.token);

        if(nextpagetoken){
            nextpagetoken = nextpagetoken;
        }
        else nextpagetoken = "notokenhere";

        ejs.renderFile('./views/partials/otherlikepage.ejs',{ items : liked , nextpagetoken : nextpagetoken},{},(err,temp)=>{
            if (err) {
                res.render('ErrorPage.ejs',{error : err});
            } else {
                res.send(temp);
            }
        });

           
    } catch (error) {
        res.render('ErrorPage.ejs',{error : error});
    }
   

});

