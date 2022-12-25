import { google } from 'googleapis';
import { clientId, clientSecret , redirectUrl } from './GoogleAuth.js';
import mongoose from 'mongoose';
import { Channel } from '../DataBase/db.js';

const OAuth2 = google.auth.OAuth2;


export const oauth2client = new OAuth2(
    clientId,
    clientSecret,
    redirectUrl
)
const youtube = google.youtube({version : 'v3' , auth : oauth2client});

export const search_videos = async (query)=>{
 let results = await youtube.search.list(
     {
         part:['snippet'], 
         q: query, 
         maxResults: 40,
     });

     let channels = [];

    for(let i = 0 ; i < results.data.items.length ; i++){
            channels.push(channel_info(results.data.items[i].snippet.channelId)); 
     }

     let channelsinfo = await Promise.all(channels);

     for(let i = 0 ; i < results.data.items.length ; i++){
        results.data.items[i].channelinfo = channelsinfo[i][0];
     }

    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}

export const popular_videos = async ()=>{
    let results = await youtube.videos.list(
    {   part:['snippet','statistics'], 
        maxResults : 40,
        chart : 'mostPopular',
        regionCode : 'In'
    });

    let channels = [];

    for(let i = 0 ; i < results.data.items.length ; i++){
            channels.push(channel_info(results.data.items[i].snippet.channelId)); 
     }

     let channelsinfo = await Promise.all(channels);

     for(let i = 0 ; i < results.data.items.length ; i++){
        results.data.items[i].channelinfo = channelsinfo[i][0];
     }
    
    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}

export const popular_videos_by_pagetoken = async (pagetoken)=>{
    let results = await youtube.videos.list({
        part:['snippet','statistics'], 
        maxResults : 40,
        chart : 'mostPopular',
        pageToken : pagetoken,
        regionCode : 'In'
    });
    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}


export const user_liked_videos = async ()=>{
    let results = await youtube.videos.list(
    {   part:['snippet','statistics'], 
        maxResults : 25,
        myRating : 'liked',
    });

    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}

export const user_liked_videos_by_pagetoken = async (pagetoken)=>{
    let results = await youtube.videos.list({
        part:['snippet','statistics'], 
        maxResults : 25,
        myRating : 'liked',
        pageToken : pagetoken,
    });
    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}

export const user_subscriptions = async ()=>{
    let results = await youtube.subscriptions.list({
        part : ['snippet'],
        maxResults : 25,
        mine : true,
    });

    return results.data.items
}

export const channel_info = async(id)=>{
    let result = await youtube.channels.list({
        part : ['snippet'],
        id : id
    })
    return result.data.items;
}