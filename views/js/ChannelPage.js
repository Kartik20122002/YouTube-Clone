
    let menuIcon = document.querySelector('.menu-icon');
    let sidebar = document.querySelector('.sidebar');
    let mainpage = document.querySelector('#channelmainpage');

    menuIcon.addEventListener('click',()=>{
        mainpage.classList.toggle('larger-container')
        sidebar.classList.toggle('small-sidebar');
        document.querySelector('.sidebar .shortcut-links').classList.toggle('large-padding');
        document.querySelector('.sidebar .subscribed-list').classList.toggle('large-padding');
    });
 
    