let menuIcon = document.querySelector('.menu-icon');
let sidebar = document.querySelector('.sidebar');
let mainpage = document.querySelector('#userpage');


menuIcon.addEventListener('click',()=>{
    sidebar.classList.toggle('small-sidebar');
    mainpage.classList.toggle('larger-container');
    document.querySelector('.sidebar .shortcut-links').classList.toggle('large-padding');
    document.querySelector('.sidebar .subscribed-list').classList.toggle('large-padding');
});
