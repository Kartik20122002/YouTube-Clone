import express from 'express';
export const Like = express.Router();
import ejs from 'ejs';
import { rating } from '../Functions/Youtube_Data.js';
Like.use(express.json());


Like.get('/',async (req,res)=>{
    let value = req.query.value;
    let videoId = req.query.videoId;
    let likes = req.query.likes;

    if(value === 'true'){

        let result = await rating(videoId,'like');

        if(result === true){
            res.send(` <a id="like" class="rating"> <img hx-get="/like?value=false&videoId=${videoId}&likes=${likes}" hx-target="#like" hx-swap="outerHTML"
            src="./images/liked.png"> 
            ${likes}
            </a>
            `)
        }
        else{
            res.send(` <a id="like" class="rating"> <img hx-get="/like?value=true&videoId=${videoId}&likes=${likes}" hx-target="#like" hx-swap="outerHTML"
        src="./images/like.png"> 
        ${likes}
        </a>`)
        }


    }
    else{

        let result = await rating(videoId,'none');
        
        if(result === true){
            res.send(` <a id="like" class="rating"> <img hx-get="/like?value=true&videoId=${videoId}&likes=${likes}" hx-target="#like" hx-swap="outerHTML"
            src="./images/like.png"> 
            ${likes}
            </a>`)
        }
        else{
            res.send(` <a id="like" class="rating"> <img hx-get="/like?value=false&videoId=${videoId}&likes=${likes}" hx-target="#like" hx-swap="outerHTML"
            src="./images/liked.png"> 
            ${likes}
            </a>
            `) 
        }
        
    }
})
.get('/dislike',async (req,res)=>{
    let value = req.query.value;
    let videoId = req.query.videoId;


    if(value === 'true'){

        let result = await rating(videoId,'dislike');

        if(result === true){
            res.send(` <a id="dislike" class="rating"> <img hx-get="/like/dislike?value=false&videoId=${videoId}" hx-target="#dislike" hx-swap="outerHTML"
            src="./images/disliked.png"> 
            </a>
            `)
        }
        else{
            res.send(` <a id="dislike" class="rating"> <img hx-get="/like/dislike?value=true&videoId=${videoId}" hx-target="#dislike" hx-swap="outerHTML"
        src="./images/dislike.png"> 
        </a>`)
        }


    }
    else{

        let result = await rating(videoId,'none');
        
        if(result === true){
            res.send(` <a id="dislike" class="rating"> <img hx-get="/like/dislike?value=true&videoId=${videoId}" hx-target="#dislike" hx-swap="outerHTML"
            src="./images/dislike.png"> 
            </a>`)
        }
        else{
            res.send(` <a id="dislike" class="rating"> <img hx-get="/like/dislike?value=false&videoId=${videoId}" hx-target="#dislike" hx-swap="outerHTML"
            src="./images/disliked.png"> 
            </a>
            `)
        }
        
    }   
})