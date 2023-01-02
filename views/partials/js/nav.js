let search_btn = document.querySelector('.nav-right .search');
let box = document.querySelector('.search-box-small');

search_btn.addEventListener('click',()=>{
    box.classList.toggle('visible-box')
});