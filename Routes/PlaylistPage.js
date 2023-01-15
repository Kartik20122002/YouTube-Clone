import express from 'express';
export const Playlist = express.Router();
import { user_subscriptions , playlist_byid} from '../Functions/Youtube_Data.js';
Playlist.use(express.json());


Playlist
.get('/',async (req,res)=>{

    try {
        let playlistId = req.query.p;

        let {playlist_items,playlist_info} = await playlist_byid(playlistId,"");

        let {subs} = await user_subscriptions();
        if(!playlist_info || !playlist_items|| !subs) throw new Error("Required Data can not be obtained");


        res.render('PlaylistPage.ejs',{playlist_items : playlist_items, playlist_info : playlist_info ,profile :req.user.profile,subs : subs , queryvalue : ""});
        
    } catch (error) {
        res.render('ErrorPage.ejs',{error : error});
    }
   

});

