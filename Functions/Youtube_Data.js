import {youtube} from './GoogleAuth.js';

export const search_videos = async (query,value)=>{
    let results = await youtube.search.list(
        {
            part:'snippet', 
            q: query, 
            maxResults: value,
        });
    return results.data.items;
}

export const popular_videos = async (value)=>{
    let results = await youtube.videos.list(
    {   part:'snippet',
        maxResults : value,
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


export const user_liked_videos = async (value)=>{
    let results = await youtube.videos.list(
    {   part:'snippet',
        maxResults : value,
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