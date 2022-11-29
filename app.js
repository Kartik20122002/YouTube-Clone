const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const homepage = require("./Routes/homepageRoute");

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.json());
app.use("/",homepage);



app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
});