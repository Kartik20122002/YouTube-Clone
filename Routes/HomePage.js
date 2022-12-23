import express from 'express';
export const Home = express.Router();

Home.use(express.json());

Home
.get('/',async (req,res)=>{
   
    let {result , nextpagetoken , prevpagetoken}= await popular_videos(25);
    ejs.renderFile('./views/HomePage.ejs',{items : result , nextpagetoken : nextpagetoken , prevpagetoken : prevpagetoken},{},(err,temp)=>{
        if (err) {
            throw err;
        } else {
            res.end(temp);
        }
    });
});