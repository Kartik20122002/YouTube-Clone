import express from 'express';
export const LoginPage = express.Router();

LoginPage.use(express.json());

LoginPage
.get('/',(req,res)=>{
    try {
        res.render('LoginPage.ejs');
    } catch (error) {
        res.send(`LoginPage : ${error}`);
    }
});
