
import express from 'express';
export const LoginPage = express.Router();
import { popular_videos ,oauth2client, user_subscriptions } from '../Functions/Youtube_Data.js';
LoginPage.use(express.json());

LoginPage
.get('/',(req,res)=>{
    res.render('LoginPage.ejs');
})