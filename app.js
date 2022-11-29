const express = require('express');
const app = express();
const port = process.env.port;

const homepage = require("./Routes/homepage");


app.use("/",homepage);



app.listen(port,()=>{
    console.log("https://localhost:"+port);
})