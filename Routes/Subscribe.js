import express from 'express';
export const Subscribe = express.Router();
import {subscribe, unsubscribe } from '../Functions/Youtube_Data.js';
Subscribe.use(express.json());



Subscribe
.get('/',async (req,res)=>{
    let id = req.query.c;
    let value = req.query.value;
    
if(value === 'true'){
    let {flag , subid} = await subscribe(id);;
    if(flag === false){
        res.send(`<button class="subscribe-btn" 
         hx-get = "/subscribe?c=${id}&value=true"
        hx-swap = "outerHTML"
         type="button">Subscribe
         </button>`)
         
    }
    else{
        res.send(`<button  class="subscribe-btn"
        hx-get = "/subscribe?subid=${subid}&value=false&c=${id}"
        hx-swap = "outerHTML"
        type="button" id="subscribed">Subscribed
</button>`);
    }
}
else{

        let subid = req.query.subid;
        let result = await unsubscribe(subid);

        if(result === true){
            res.send(`<button class="subscribe-btn"   
            hx-get = "/subscribe?c=${id}&value=true"
            hx-swap = "outerHTML"
             type="button">Subscribe
             </button>`)
        }
        else{
        res.send(`<button class="subscribe-btn" 
        hx-get = "/subscribe?subid=${subid}&value=false&c=${id}"
        hx-swap = "outerHTML"
        type="button" id="subscribed">Subscribed
</button>`);
        }
}
});










