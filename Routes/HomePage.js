import express from 'express';
export const Home = express.Router();

Home.use(express.json());

Home
.get('/',(req,res)=>{
    res.render('HomePage.ejs');
})