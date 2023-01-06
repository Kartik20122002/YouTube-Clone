import express from 'express';
export const ChannelPage = express.Router();
import ejs from 'ejs';
import { channel_activities, channel_info, channel_playlists, get_date, user_subscriptions } from '../Functions/Youtube_Data.js';
ChannelPage.use(express.json());


ChannelPage
.get('/',async (req,res)=>{

    try {
        let channel_id =req.query.c;
        let item0 = channel_info(channel_id);
        let item1 =  channel_playlists(channel_id,"");
        let item2 = channel_activities(channel_id,"");
        let item3 = user_subscriptions();

        let result = await Promise.all([item0,item1,item2,item3]);

        let channelinfo = result[0];
        let {channelplaylists , playlists_count , playlists_token} = result[1];
        let {channelactivities, activities_count , activities_token} = result[2];
        let {subs , sub_count} = result[3];

        if(playlists_token == null) playlists_token = "notokenhere";
        if(activities_token == null) activities_token = "notokenhere";

        res.render('ChannelPage.ejs',{
            profile : req.user.profile,
            subs : subs,
            sub_count : sub_count,
            channelinfo : channelinfo,
            channelplaylists : channelplaylists,
            playlists_count : playlists_count,
            playlists_token : playlists_token,
            channelactivities : channelactivities,
            activities_count : activities_count,
            activities_token : activities_token,
            queryvalue : "",
            datefunction : get_date,
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

