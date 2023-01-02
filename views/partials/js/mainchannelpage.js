let playlist_btn = document.querySelector('#playlists .title a');
let hidden_playlist_videos = document.querySelectorAll('#playlists .hidden');

playlist_btn.addEventListener('click',()=>{
    hidden_playlist_videos.forEach(item => {
        item.classList.toggle('visible');
    });
})

let recent_uploads_btn = document.querySelector('#recent_uploads .title a');
let hidden_recents_videos = document.querySelectorAll('#recent_uploads .hidden');

recent_uploads_btn.addEventListener('click',()=>{
    hidden_recents_videos.forEach(item => {
        item.classList.toggle('visible');
    });
})