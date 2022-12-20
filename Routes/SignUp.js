import { GetToken , SetToken , oauth2Client } from "../Functions/GoogleAuth.js";
import url from 'url';
import http from 'http';
import express from 'express';

export const SignUp  = express.Router();

SignUp.use(express.json());

SignUp
.get('/',async (req,res)=>{
    try {
        let URL = await GetToken();
        res.redirect(URL);
    } catch (error) {
        res.send(`SignUp : ${error}`);
    }
})
.get('/token',async (req,res)=>{

    try {
    const code = url.parse(req.url,true).query.code;
    await SetToken(code);
    if(oauth2Client.credentials.access_token != null){
        res.redirect('/');
    }
    else{
        res.redirect('/error');
    }
    } catch (error) {
        res.send(`SignUp Token : ${error}`);
    }

    
})