import express from 'express';
export const Playlist = express.Router();
import ejs from 'ejs';
import { user_subscriptions , playlist_byid} from '../Functions/Youtube_Data.js';
Playlist.use(express.json());


Playlist
.get('/',async (req,res)=>{

    try {
        let playlistId = req.query.p;

        let {playlist_items,playlist_info} = await playlist_byid(playlistId,"");

        let {subs} = await user_subscriptions();

        res.render('PlaylistPage.ejs',{playlist_items : playlist_items, playlist_info : playlist_info ,profile :req.user.profile,subs : subs , queryvalue : ""});
        
    } catch (error) {
        if(error.response){
            if(error.response.data){
                if(error.response.data.error){
                        res.status(error.response.data.error.code).send(error.response.data.error.message);
                }
            }

        }
        else{
            res.send(error)
        }
    }
   

});

