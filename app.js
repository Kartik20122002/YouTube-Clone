import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { secret } from './Functions/GoogleAuth.js';
import { Auth, isLoggedIn } from './Routes/Auth.js';
import { Home } from './Routes/HomePage.js';
import { OtherHomePage } from './Routes/OtherHomePage.js';
import { Liked_Page } from './Routes/LikedVideos.js';
import { OtherLikePage } from './Routes/OtherLikedPage.js';
import { SearchResults } from './Routes/SearchResults.js';
import { videopage } from './Routes/VideoPage.js';
import { UserPage } from './Routes/UserPage.js';
import { ChannelPage} from './Routes/ChannelPage.js';

const app = express();
app.use(session({
    secret : secret ,
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.use(express.static('./views'));
app.set('views','./views');
app.use(express.urlencoded({ extended: true }));

app.use('/googleauth',Auth);
app.use('/',isLoggedIn,Home);
app.use('/likedvideos',isLoggedIn,Liked_Page);
app.use('/searchresults',isLoggedIn,SearchResults);
app.use('/videopage',isLoggedIn,videopage)
app.use('/otherpage',OtherHomePage);
app.use('/otherlikedpage',OtherLikePage);
app.use('/userpage',UserPage);
app.use('/channelpage',ChannelPage);

app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
});