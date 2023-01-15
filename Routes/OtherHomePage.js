import express from 'express';
export const OtherHomePage = express.Router();
import ejs from 'ejs';
import {popular_videos_bytoken } from '../Functions/Youtube_Data.js';
OtherHomePage.use(express.json());



OtherHomePage
.get('/',async (req,res)=>{

    try {
    
        let {result , nextpagetoken}= await popular_videos_bytoken(req.query.token);
        
        if(nextpagetoken){
             nextpagetoken = nextpagetoken;
        }
        else nextpagetoken = "notokenhere";

        ejs.renderFile('./views/partials/otherhomepage.ejs',{ items : result , nextpagetoken : nextpagetoken},{},(err,temp)=>{
            if (err) {
                throw err;
            } else {
                res.send(temp);
            }
        });


           
    } catch (error) {
        if(error.response){
            res.render('ErrorPage.ejs',{error : error});
        }
        else{
            res.render('LoginPage.ejs');
        }
    }
   

});

