import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Auth, isLoggedIn } from './Routes/Auth.js';
import { Home } from './Routes/HomePage.js';
import { SearchResults } from './Routes/SearchResults.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(session({secret : process.env.SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.use(express.static('./views'));
app.set('views','./views');
app.use(express.urlencoded({ extended: true }))


app.use('/',isLoggedIn,Home);
app.use('/googleauth',Auth);
app.use('/searchresults',isLoggedIn,SearchResults);

app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
});