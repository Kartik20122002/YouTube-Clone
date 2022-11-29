const express = require("express");
const router = express.Router();

router.use(express.json());

router.use(function(req,res,next){
    console.log("I am here");
    next();
})

router.route("/")
.get((req,res)=>{
    res.render('HomePage');
})

module.exports = router;