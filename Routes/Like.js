import express from 'express';
export const Like = express.Router();
import { rating } from '../Functions/Youtube_Data.js';
Like.use(express.json());


Like.get('/',async (req,res)=>{
    let value = req.query.value;
    let videoId = req.query.videoId;
    let likes = req.query.likes;

    likes = Number(likes);

    let temp = likes;

    if(value === 'true'){
    
    likes = likes+1;
    temp = likes;

    let likess = likes;
    if(likes >= 1000){likes = Math.trunc(likes/1000); likess = likes + 'K'}
    if(likes >= 1000){likes = Math.trunc(likes/1000); likess = likes + 'M'}
    if(likes >= 1000){likes = Math.trunc(likes/1000); likess = likes + 'B'}

        let result = await rating(videoId,'like');

        if(result === true){
            res.send(`
            <div class="buttons" id="buttons">
             <a id="like" class="rating" hx-get="/like?value=false&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
             <img src="./images/liked.png"> 
            ${likess}
            </a>
            <a id="dislike" class="rating" hx-get="/like/dislike?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
            <img src="./images/dislike.png"> 
            </a>
            <a href="#" id="share"><img src="./images/share.png">Share</a>
            <a href="#" id="save"><img src="./images/download.png">Download</a>
            </div>
            `)
        }
        else{
            res.send(` 
            <div class="buttons" id="buttons">
             <a id="like" class="rating" hx-get="/like?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
             <img src="./images/like.png"> 
            ${likess}
            </a>
            <a id="dislike" class="rating" hx-get="/like/dislike?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
            <img src="./images/dislike.png"> 
            </a>
            <a href="#" id="share"><img src="./images/share.png">Share</a>
            <a href="#" id="save"><img src="./images/download.png">Download</a>
            </div>
            `)
        }


    }
    else{

    likes = likes-1;
    temp = likes;
    let likess = likes;
    if(likes >= 1000){likes = Math.trunc(likes/1000); likess = likes + 'K'}
    if(likes >= 1000){likes = Math.trunc(likes/1000); likess = likes + 'M'}
    if(likes >= 1000){likes = Math.trunc(likes/1000); likess = likes + 'B'}

        let result = await rating(videoId,'none');
        
        if(result === true){

            res.send(` 
            <div class="buttons" id="buttons">
             <a id="like" class="rating" hx-get="/like?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
             <img src="./images/like.png"> 
            ${likess}
            </a>
            <a id="dislike" class="rating" hx-get="/like/dislike?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
            <img src="./images/dislike.png"> 
            </a>
            <a href="#" id="share"><img src="./images/share.png">Share</a>
            <a href="#" id="save"><img src="./images/download.png">Download</a>
            </div>
            `)
        }
        else{
            res.send(` 
            <div class="buttons" id="buttons">
             <a id="like" class="rating" hx-get="/like?value=false&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
             <img src="./images/liked.png"> 
            ${likess}
            </a>
            <a id="dislike" class="rating" hx-get="/like/dislike?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
            <img src="./images/dislike.png"> 
            </a>
            <a href="#" id="share"><img src="./images/share.png">Share</a>
            <a href="#" id="save"><img src="./images/download.png">Download</a>
            </div>
            `) 
        }
        
    }
})
.get('/dislike',async (req,res)=>{
    let value = req.query.value;
    let videoId = req.query.videoId;
    let likes = req.query.likes;

    likes = Number(likes);
    let temp = likes;

    let likess = likes;
    if(likes >= 1000){likes = Math.trunc(likes/1000); likess = likes + 'K'}
    if(likes >= 1000){likes = Math.trunc(likes/1000); likess = likes + 'M'}
    if(likes >= 1000){likes = Math.trunc(likes/1000); likess = likes + 'B'}

    if(value === 'true'){

        let result = await rating(videoId,'dislike');

        if(result === true){
            res.send(`
            <div class="buttons" id="buttons">
             <a id="like" class="rating" hx-get="/like?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
             <img src="./images/like.png"> 
            ${likess}
            </a>
            <a id="dislike" class="rating" hx-get="/like/dislike?value=false&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
            <img src="./images/disliked.png"> 
            </a>
            <a href="#" id="share"><img src="./images/share.png">Share</a>
            <a href="#" id="save"><img src="./images/download.png">Download</a>
            </div>
            `)
        }
        else{
            res.send(` 
            <div class="buttons" id="buttons">
             <a id="like" class="rating" hx-get="/like?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
             <img src="./images/like.png"> 
            ${likess}
            </a>
            <a id="dislike" class="rating" hx-get="/like/dislike?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
            <img src="./images/dislike.png"> 
            </a>
            <a href="#" id="share"><img src="./images/share.png">Share</a>
            <a href="#" id="save"><img src="./images/download.png">Download</a>
            </div>
        `)
        }


    }
    else{

        let result = await rating(videoId,'none');

        if(result === true){
            res.send(` 
            <div class="buttons" id="buttons">
             <a id="like" class="rating" hx-get="/like?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
             <img src="./images/like.png"> 
            ${likess}
            </a>
            <a id="dislike" class="rating" hx-get="/like/dislike?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
            <img src="./images/dislike.png"> 
            </a>
            <a href="#" id="share"><img src="./images/share.png">Share</a>
            <a href="#" id="save"><img src="./images/download.png">Download</a>
            </div>
            `)
        }
        else{
            res.send(` 
            <div class="buttons" id="buttons">
             <a id="like" class="rating" hx-get="/like?value=true&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
             <img src="./images/like.png"> 
            ${likess}
            </a>
            <a id="dislike" class="rating" hx-get="/like/dislike?value=false&videoId=${videoId}&likes=${temp}" hx-target="#buttons" hx-swap="outerHTML">
            <img src="./images/disliked.png"> 
            </a>
            <a href="#" id="share"><img src="./images/share.png">Share</a>
            <a href="#" id="save"><img src="./images/download.png">Download</a>
            </div>
            `)
        }
        
    }   
})