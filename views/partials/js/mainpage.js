let container = document.querySelector('#mainpage .list-container');

for(let i = 0 ; i < data.length ; i++){
    
    setTimeout(()=>{
        const vid = document.createElement('div');
        const skeletonvid = document.querySelector(`#mainpage .s${i}`)
        vid.classList.add('vid-list');
        let views = (data[i].statistics.viewCount/1000000).toFixed(1);
        if(views > 10) views = Math.trunc(views);
        if(views > 1) views = views + 'M';
        if(views <= 1) views = (data[i].statistics.viewCount/1000).toFixed(1) + 'K';
        
        vid.innerHTML = `
                        <a href=/videopage?v=${data[i].id}&c=${data[i].snippet.channelId}>  <img src=${data[i].snippet.thumbnails.medium.url} class="thumbnail" alt="Image Here" srcset=""> </a>
                        <div class="flex-div">
                         <a href=https://www.youtube.com/channel/${data[i].snippet.channelId} ><img class="video${i}" src=${data[i].channelinfo.snippet.thumbnails.medium.url} alt="" srcset=""></a> 
                            <div class="vid-info">
                                <a href=/videopage?v=${data[i].id}&c=${data[i].snippet.channelId}>${data[i].snippet.title}</a>
                               <a href=https://www.youtube.com/channel/${data[i].snippet.channelId}> <p>${data[i].snippet.channelTitle}</p></a>
                                
                                <p> ${views} Views &bull; 2 days</p>
                            </div>
                        </div>
        `
        container.replaceChild(vid,skeletonvid);
    },Math.floor((Math.random() * 100) + 1)*10);
}




