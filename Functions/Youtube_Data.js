import { google } from 'googleapis';
import { config } from 'dotenv';
config();
import { clientId, clientSecret , redirectUrl } from './GoogleAuth.js';
import fetch from 'node-fetch';

const OAuth2 = google.auth.OAuth2;


export const oauth2client = new OAuth2(
    clientId,
    clientSecret,
    redirectUrl
)
const youtube = google.youtube({version : 'v3' , auth : oauth2client});

export const search_videos = async (query)=>{

    try {
        let results = await youtube.search.list(
            {
                part:['snippet'], 
                q: query, 
                maxResults: 50,
            });
        
            let channelsId = [];
        
             for(let i = 0; i < results.data.items.length ; i++){
                 channelsId.push(results.data.items[i].snippet.channelId);
            }
         
            let channelsinfo = await channel_info(channelsId);
         
            for(let i = 0 ; i < results.data.items.length ; i++){
                results.data.items[i].channelinfo = channelsinfo[i];
               
                if( results.data.items[i].channelinfo == null){
                    results.data.items[i].channelinfo = {snippet : {thumbnails : {medium : {url :{}}}}};
                }
            }  
        
            return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
    } catch (error) {
        return error;
    }

}

export const popular_videos = async ()=>{

    try {
        let results = await youtube.videos.list(
            {   part:['snippet','statistics'], 
                maxResults : 50,
                chart : 'mostPopular',
                regionCode : 'In'
            });
        
            let channelsId = [];
        
             for(let i = 0; i < results.data.items.length ; i++){
                 channelsId.push(results.data.items[i].snippet.channelId);
            }
        
            
            let channelsinfo = await youtube.channels.list({
                part : ['snippet'],
                maxResults : 50,
                id : channelsId,
            });
         
            for(let i = 0 ; i < results.data.items.length ; i++){
                    results.data.items[i].channelinfo = channelsinfo.data.items[i];
              if(results.data.items[i].channelinfo == null) results.data.items[i].channelinfo = {snippet : {thumbnails : {medium : {url :{}}}}};
            }
        
            return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
    } catch (error) {
        return error;
    }


}

export const popular_videos_bytoken = async (token)=>{

    try {
        let results = await youtube.videos.list(
            {   part:['snippet','statistics'], 
                maxResults : 50,
                chart : 'mostPopular',
                regionCode : 'In',
                pageToken : token
            });
        
            let channelsId = [];
        
             for(let i = 0; i < results.data.items.length ; i++){
                 channelsId.push(results.data.items[i].snippet.channelId);
            }
        
            
            let channelsinfo = await youtube.channels.list({
                part : ['snippet'],
                maxResults : 50,
                id : channelsId,
            });
         
            for(let i = 0 ; i < results.data.items.length ; i++){
                    results.data.items[i].channelinfo = channelsinfo.data.items[i];
                    if(results.data.items[i].channelinfo == null) results.data.items[i].channelinfo = {id : "" ,snippet : {thumbnails : {medium : {url :{}}}}};
            }
        
        
            return {result : results.data.items, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
    } catch (error) {
        return error;
    }
    
}

export const liked_videos = async (token)=>{

    try {
        let results = await youtube.videos.list(
            {   
            part:['snippet','statistics'], 
            myRating : 'like',
            maxResults : 50,
            pageToken : token
        });
    
        let channelsId = [];
    
         for(let i = 0; i < results.data.items.length ; i++){
             channelsId.push(results.data.items[i].snippet.channelId);
        }
    
        
        let channelsinfo = await youtube.channels.list({
            part : ['snippet'],
            maxResults : 50,
            id : channelsId,
        });
     
        for(let i = 0 ; i < results.data.items.length ; i++){
                results.data.items[i].channelinfo = channelsinfo.data.items[i];
                if(results.data.items[i].channelinfo == null) results.data.items[i].channelinfo = {id : "" ,snippet : {thumbnails : {medium : {url :{}}}}};
        }
    
    
        return {liked : results.data.items,count : results.data.pageInfo.totalResults, nextpagetoken : results.data.nextPageToken , prevpagetoken : results.data.prevPageToken};
    } catch (error) {
        return error;
    }
    
}

export const user_subscriptions = async ()=>{
    try {
        let results = await youtube.subscriptions.list({
            part : ['snippet','contentDetails'],
            maxResults : 25,
            mine : true,
        });
    
        return {subs : results.data.items , sub_count : results.data.pageInfo.totalResults};    
    } catch (error) {
        return error;
    }
}

export const channel_info = async(id)=>{
   try {
    let result = await youtube.channels.list({
        part : ['snippet','statistics','contentDetails'],
        id : id,
        maxResults : 2
    });

    return result.data.items[0];
   } catch (error) {
      return error;
   }
}

export const RelatedVideos = async (id)=>{
    try {
const url = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxResults=25`;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '79f25e9d42mshed666ecd3dda012p1ed78ejsnaa144f427d4e',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

let results = await fetch(url,options);
results = await results.json();

return results;

    } catch (error) {
        return error;
    }


}

export const get_videoAndChannel = async (videoId , ChannelId)=>{
    try {
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
        
        let relatedvideos = await RelatedVideos(videoId);
    
        if(relatedvideos == null) relatedvideos = {items : {}};
        
    
        return {relatedvideos : relatedvideos ,video : videodetails.data.items[0], channel : channeldetials.data.items[0]};
    } catch (error) {
        return error;
    }
}

export const getComments = async (videoId)=>{
   try {
    
    let result = await youtube.commentThreads.list({
        part : ['snippet'],
        videoId : videoId,
        maxResults : 50
    });

    return result.data.items;
   } catch (error) {
      return error;
   }
}

export const getRating = async (videoId)=>{
    try {
        let result = await youtube.videos.getRating({
            id: videoId,
        })
    
        return result;
    } catch (error) {
        return error;
    }
}

export const user_playlists = async ()=>{
    try {
        let playlists = await youtube.playlists.list({
            part : ['snippet' , 'contentDetails'],
            mine : true
         })
    
         return {playlists : playlists.data.items , playlist_count : playlists.data.pageInfo.totalResults};
    } catch (error) {
        return error;
    }
}

export const channel_playlists = async (channelId , token)=>{
   try {
    let playlists = await youtube.playlists.list({
        part : ['snippet' , 'contentDetails'],
        channelId : channelId,
        pageToken : token,
        maxResults : 25,
    })

    return {channelplaylists : playlists.data.items , playlists_count : playlists.data.pageInfo.totalResults , playlists_token : playlists.data.nextPageToken};
   } catch (error) {
    return error;
   }
}

export const channel_activities = async (channelId,token)=>{
   try {
    let activities = await youtube.activities.list({
        part : ['snippet','contentDetails'],
        channelId : channelId,
        pageToken : token,
        maxResults: 25,
       });
    
       return {channelactivities : activities.data.items , activities_count : activities.data.pageInfo.totalResults , activities_token : activities.data.nextPageToken};
   } catch (error) {
       return error;
   }
}

export const get_date = (isoformat)=>{
 try {
       
    let year = isoformat.slice(0,4); 
    let month = isoformat.slice(5,7);  
    let day = isoformat.slice(8,10);  
    let date = day + "/" + month + "/" + year;

    return date;
 } catch (error) {
    return error;
 }
}

export const playlist_byid = async (playlistId, token)=>{
    try {
        
        let playlist_items = youtube.playlistItems.list({
            part : ['snippet' , 'contentDetails'],
            maxResults: 50,
            playlistId : playlistId,
            pageToken : token
        })

        let playlist_info = youtube.playlists.list({
            part : ['snippet' , 'contentDetails'],
            maxResults: 50,
            id: playlistId,
            pageToken : token
        })

        let result = await Promise.all([playlist_items,playlist_info])

        playlist_items = result[0];
        playlist_info = result[1];

        return {playlist_items : playlist_items.data,playlist_info : playlist_info.data.items[0]}

    } catch (error) {
        return error;
    }
}

export const is_Subscribed = async (channelId)=>{
    try {
        let result = await youtube.subscriptions.list({
            part : ['id'],
            forChannelId : channelId,
            mine : true
        });
        
        let id = "";
        if(result.data.pageInfo.totalResults > 0) id = result.data.items[0].id;
    
    
        return {flag : result.data.pageInfo.totalResults , id : id};
    } catch (error) {
        return error;
    }
}

export const subscribe = async (channelId)=>{
    try {
        let result = await youtube.subscriptions.insert({
            part : 'snippet',
            requestBody : {
                snippet: {
                  resourceId: {
                    channelId: channelId
                  }
                }
              }
        });
    
        if(result.data.snippet.resourceId.channelId === channelId) return {flag : true , subid : result.data.id};
        else return {flag : false , subid : ""};
    } catch (error) {
        return error;
    }
}

export const unsubscribe = async (subid)=>{
    try {
        let result = await youtube.subscriptions.delete({
            part : 'snippet',
            id : subid,
        })
    
        if(result.status === 204) return true;
        else return false;
    } catch (error) {
        return error;
    }
}

export const rating = async(videoId,rating)=>{
    try {
        let result = await youtube.videos.rate({
            id:videoId,
            rating : rating
        })
    
        if(result.status === 204) return true;
        return false;
    } catch (error) {
        return error;
    }
}