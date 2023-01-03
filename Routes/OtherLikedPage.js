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

