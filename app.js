import { config } from 'dotenv';
import express from 'express';
import ejs from 'ejs';
import { search_videos , popular_videos , popular_videos_by_pagetoken} from './Functions/Youtube_Data.js';
import { Auth } from './Middleware/auth.js';
import { logout } from './Functions/GoogleAuth.js';
import { Home } from './Routes/HomePage.js';
import { LoginPage } from './Routes/LoginPage.js';
import {SignUp} from './Routes/SignUp.js';

config();


const app = express();
const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.use(express.static('./views'));
app.set('views','./views');


app.get('/',Auth,async (req,res)=>{
   
    let {result , nextpagetoken , prevpagetoken}= await popular_videos(25);
    ejs.renderFile('./views/HomePage.ejs',{items : result , nextpagetoken : nextpagetoken , prevpagetoken : prevpagetoken},{},(err,temp)=>{
        if (err) {
            throw err;
        } else {
            res.end(temp);
        }
    });
    // res.render('Homepage.ejs',{items : result , nextpagetoken : nextpagetoken , prevpagetoken : prevpagetoken });
});



app.get('/otherpages',async(req,res)=>{
    let pageToken = req.query.id;
    let {result , nextpagetoken , prevpagetoken } = await popular_videos_by_pagetoken(pageToken);
    res.render('Homepage.ejs',{items : result , nextpagetoken : nextpagetoken , prevpagetoken : prevpagetoken });
    res.end();
});

app.get('/logout',async (req,res)=>{
    await logout();
    res.redirect('/');
})

app.get('/loginpage',LoginPage);
app.use('/googlesignin',SignUp);



app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
});