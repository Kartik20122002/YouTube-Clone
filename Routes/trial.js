import express from 'express';
export const trial = express.Router();
import { clientId , clientSecret , redirectUrl} from '../Functions/GoogleAuth.js';
import refresh from 'passport-oauth2-refresh';
import { oauth2client } from '../Functions/Youtube_Data.js';
import {google} from 'googleapis';
const sts = google.sts('v1');
trial.use(express.json());


trial.get('/',async(req,res)=>{
    
    
     res.send('ok');
})


