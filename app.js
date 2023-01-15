import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { secret } from './Functions/GoogleAuth.js';
import { Auth, isLoggedIn , checktoken} from './Routes/Auth.js';
import { Home } from './Routes/HomePage.js';
import { OtherHomePage } from './Routes/OtherHomePage.js';
import { Liked_Page } from './Routes/LikedVideos.js';
import { OtherLikePage } from './Routes/OtherLikedPage.js';
import { SearchResults } from './Routes/SearchResults.js';
import { videopage } from './Routes/VideoPage.js';
import { UserPage } from './Routes/UserPage.js';
import { ChannelPage} from './Routes/ChannelPage.js';
import { Playlist } from './Routes/PlaylistPage.js';
import { Subscribe } from './Routes/Subscribe.js';
import { Like } from './Routes/Like.js';
import { LoginPage } from './Routes/LoginPage.js';


const app = express();
app.use(session({
    secret : secret ,
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.use(express.static('./views'));
app.set('views','./views');
app.use(express.urlencoded({ extended: true }));


app.use('/googleauth',Auth);
app.use('/',isLoggedIn,checktoken,Home);
app.use('/likedvideos',isLoggedIn,checktoken,Liked_Page);
app.use('/searchresults',isLoggedIn,checktoken,SearchResults);
app.use('/videopage',isLoggedIn,checktoken,videopage)
app.use('/playlist',checktoken,Playlist);
app.use('/otherpage',checktoken,OtherHomePage);
app.use('/otherlikedpage',checktoken,OtherLikePage);
app.use('/userpage',checktoken,UserPage);
app.use('/channelpage',checktoken,ChannelPage);
app.use('/subscribe',checktoken,Subscribe);
app.use('/like',checktoken,Like)
app.use('/loginpage',LoginPage);

app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
});