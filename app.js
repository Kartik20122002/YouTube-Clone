import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { secret } from './Functions/GoogleAuth.js';
import { Auth, isLoggedIn } from './Routes/Auth.js';
import { Home } from './Routes/HomePage.js';
import { SearchResults } from './Routes/SearchResults.js';
import { videopage } from './Routes/VideoPage.js';

const app = express();
app.use(session({secret : secret}));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.use(express.static('./views'));
app.set('views','./views');
app.use(express.urlencoded({ extended: true }))

app.get('/',isLoggedIn,Home);
app.use('/googleauth',Auth);
app.use('/searchresults',isLoggedIn,SearchResults);
app.use('/videopage',isLoggedIn,videopage)

app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
});