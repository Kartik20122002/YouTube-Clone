import { config } from 'dotenv';
import express from 'express';
import { Auth } from './Middleware/auth.js';
import { Home } from './Routes/HomePage.js';
import { LoginPage } from './Routes/LoginPage.js';
import {SignUp} from './Routes/SignUp.js';

config();

const app = express();
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static('./views'));
app.set('views','./views');

app.get('/',Auth,Home);
app.get('/loginpage',LoginPage);
app.use('/googlesignin',SignUp);



app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
});