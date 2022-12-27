
    let menuIcon = document.querySelector('.menu-icon');
    let sidebar = document.querySelector('.sidebar');
    let mainpage = document.querySelector('#mainpage');

    menuIcon.addEventListener('click',()=>{
        sidebar.classList.toggle('small-sidebar');
        document.querySelector('.sidebar .shortcut-links').classList.toggle('large-padding');
        document.querySelector('.sidebar .subscribed-list').classList.toggle('large-padding');
        mainpage.classList.toggle('larger-container')
    });
 
    