import { google } from 'googleapis';
import { config } from 'dotenv';
config();
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

// let maxResults = 40;
// let part = "snippet";

// const url = `https://youtube-v31.p.rapidapi.com/search?q=${query}&part=${part}&maxResults=${maxResults}&order=date`;

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '79f25e9d42mshed666ecd3dda012p1ed78ejsnaa144f427d4e',
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// };

//    let results = await fetch(url, options)
	
 let results = await youtube.search.list(
     {
         part:['snippet'], 
         q: query, 
         maxResults: 40,
     });

    //  console.log(results);

     let channelsId = [];

     for(let i = 0; i < results.data.items.length ; i++){
         channelsId.push(results.data.items[i].snippet.channelId);
     }
 
      let channelsinfo = await channel_info(channelsId);
 
      for(let i = 0 ; i < results.data.items.length ; i++){
         results.data.items[i].channelinfo = channelsinfo[i];
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

    let channelsId = [];

    for(let i = 0; i < results.data.items.length ; i++){
        channelsId.push(results.data.items[i].snippet.channelId);
    }

     let channelsinfo = await channel_info(channelsId);

     for(let i = 0 ; i < results.data.items.length ; i++){
        results.data.items[i].channelinfo = channelsinfo[i];
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

export const get_videoAndChannel = async (videoId , ChannelId)=>{
    let videodetails = await youtube.videos.list({
        part: ['snippet','statistics'],
        id: videoId,
        maxResults: 1
    });

    let channeldetials = await youtube.channels.list({
        part: ['snippet','statistics'],
        id: ChannelId,
        maxResults: 1
    });
    let relatedvideos = await  youtube.search.list(
        {
            part:['snippet'], 
            relatedToVideoId : videoId,
            type : 'video',
            maxResults: 30,
        });;
    

    return {relatedvideos : relatedvideos ,video : videodetails.data.items[0], channel : channeldetials.data.items[0]};
}