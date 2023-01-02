import express from 'express';
export const ChannelPage = express.Router();
import ejs from 'ejs';
import { user_subscriptions } from '../Functions/Youtube_Data.js';
ChannelPage.use(express.json());


ChannelPage
.get('/',async (req,res)=>{

    try {

        res.render('ChannelPage.ejs',{profile : {photos : [{value :{}}]},subs : {} , queryvalue : ""});
        
    } catch (error) {
        if(error.response){
            if(error.response.data){
                if(error.response.data.error){
                        res.status(error.response.data.error.code).send(error.response.data.error.message);
                }
            }

        }
        else{
            res.send(error)
        }
    }
   

});

