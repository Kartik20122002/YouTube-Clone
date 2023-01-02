import express from 'express';
export const OtherHomePage = express.Router();
import ejs from 'ejs';
import {popular_videos_bytoken } from '../Functions/Youtube_Data.js';
OtherHomePage.use(express.json());



OtherHomePage
.get('/',async (req,res)=>{

    console.log('request reached',req.query.token);


    try {
    
        let {result , nextpagetoken}= await popular_videos_bytoken(req.query.token);

        ejs.renderFile('./views/partials/otherhomepage.ejs',{ items : result , nextpagetoken : nextpagetoken},{},(err,temp)=>{
            if (err) {
                throw err;
            } else {
                res.send(temp);
            }
        });
           
    } catch (error) {
        if(error.response){
            if(error.response.data){
                if(error.response.data.error){
                    console.log(error);
                        res.status(error.response.data.error.code).send(error.response.data.error.message);
                }
            }

        }
        else{
            res.send(error)
        }
    }
   

});

