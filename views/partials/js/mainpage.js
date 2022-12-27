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
                        <a href=https://www.youtube.com/watch?v=${data[i].id}>  <img src=${data[i].snippet.thumbnails.medium.url} class="thumbnail" alt="Image Here" srcset=""> </a>
                        <div class="flex-div">
                         <a href=https://www.youtube.com/${data[i].channelinfo.snippet.customUrl}><img src=${data[i].channelinfo.snippet.thumbnails.medium.url} alt="" srcset=""></a> 
                            <div class="vid-info">
                                <a href=https://www.youtube.com/watch?v=${data[i].id}>${data[i].snippet.title}</a>
                               <a href=https://www.youtube.com/${data[i].channelinfo.snippet.customUrl}> <p>${data[i].snippet.channelTitle}</p></a>
                                
                                <p> ${views} Views &bull; 2 days</p>
                            </div>
                        </div>
        `
        container.replaceChild(vid,skeletonvid);
    },Math.floor((Math.random() * 100) + 1)*50);


}



// <% for(let i = 0 ; i < items.length ; i++){ %>

//     <div class="vid-list">
//         <a href=https://www.youtube.com/watch?v=<%=items[i].id%>>  <img src=<%=items[i].snippet.thumbnails.medium.url%> class="thumbnail" alt="Image Here" srcset=""> </a>
//         <div class="flex-div">
//          <a href=https://www.youtube.com/<%=items[i].channelinfo.snippet.customUrl%>><img src=<%=items[i].channelinfo.snippet.thumbnails.medium.url%> alt="" srcset=""></a> 
//             <div class="vid-info">
//                 <a href=https://www.youtube.com/watch?v=<%=items[i].id%>><%-items[i].snippet.title%></a>
//                <a href=https://www.youtube.com/<%=items[i].channelinfo.snippet.customUrl%>> <p><%-items[i].snippet.channelTitle%></p></a>
//                 <% let views = (items[i].statistics.viewCount/1000000).toFixed(1)%>
//                 <% if(views > 10) views = Math.trunc(views)%>
//                 <% if(views > 1) views = views + 'M' %>
//                 <% if(views <= 1) views = (items[i].statistics.viewCount/1000).toFixed(1) + 'K' %>
//                 <p> <%=views%> Views &bull; 2 days</p>
//             </div>
//         </div>
//     </div>
// <%}%>