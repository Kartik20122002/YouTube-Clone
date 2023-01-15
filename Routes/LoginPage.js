import express from 'express';
export const LoginPage = express.Router();
LoginPage.use(express.json());

LoginPage
.get('/',(req,res)=>{
    res.render('LoginPage.ejs');
})