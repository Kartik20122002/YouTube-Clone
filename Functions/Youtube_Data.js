import { google } from 'googleapis';
import { clientId, clientSecret , redirectUrl } from './GoogleAuth.js';
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
         part:'snippet', 
         q: query, 
         maxResults: 25,
     });
    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}

export const popular_videos = async ()=>{
    let results = await youtube.videos.list(
    {   part:'snippet',
        maxResults : 25,
        chart : 'mostPopular',
        regionCode : 'In'
    });
    
    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}

export const popular_videos_by_pagetoken = async (pagetoken)=>{
    let results = await youtube.videos.list({
        part:'snippet',
        maxResults : 25,
        chart : 'mostPopular',
        pageToken : pagetoken,
        regionCode : 'In'
    });
    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}


export const user_liked_videos = async ()=>{
    let results = await youtube.videos.list(
    {   part:'snippet',
        maxResults : 25,
        myRating : 'liked',
    });

    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}

export const user_liked_videos_by_pagetoken = async (pagetoken)=>{
    let results = await youtube.videos.list({
        part:'snippet',
        maxResults : 25,
        myRating : 'liked',
        pageToken : pagetoken,
    });
    return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
}

// yt url = https://www.youtube.com/watch?v=${videoid}