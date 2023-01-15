import express from 'express';
export const UserPage = express.Router();
import { user_playlists , liked_videos , user_subscriptions } from '../Functions/Youtube_Data.js';
UserPage.use(express.json());



UserPage
.get('/',async (req,res)=>{
    
        let {liked,count}= await liked_videos();
        let {playlists ,playlist_count} = await user_playlists();
        let {subs,sub_count} = await user_subscriptions();

    try {
       res.render('UserPage.ejs',{
        queryvalue : "" , 
        profile : req.user.profile,
        subs : subs,
        sub_count : sub_count,
        liked : liked,
        like_count : count,
        playlists : playlists,
        playlist_count : playlist_count
    });
           
    } catch (error) {
        res.render('ErrorPage.ejs',{error : error});
    }
   

});

