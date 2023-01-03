import express from 'express';
export const ChannelPage = express.Router();
import ejs from 'ejs';
import { channel_activities, channel_info, channel_playlists, user_subscriptions } from '../Functions/Youtube_Data.js';
ChannelPage.use(express.json());


ChannelPage
.get('/',async (req,res)=>{

    try {
        let channel_id =req.query.c;
        let channelinfo = channel_info(channel_id);
        let {channelplaylists , playlists_count , playlists_token} = channel_playlists(channel_id,"");
        let {channelactivities, activites_count , activities_token} = channel_activities(channel_id,"");
        let {subs , sub_count} = user_subscriptions();

        if(playlists_token == null) playlists_token = "notokenhere";
        if(activities_token == null) activities_token = "notokenhere";

        res.render('ChannelPage.ejs',{
            profile : req.user.profile,
            subs : subs,
            sub_count : sub_count,
            channelplaylists : channelplaylists,
            playlists_count : playlists_count,
            playlists_token : playlists_token,
            channelactivities : channelactivities,
            activites_count : activites_count,
            activities_token : activities_token
        });
       
        
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

