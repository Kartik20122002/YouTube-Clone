
    let menuIcon = document.querySelector('.menu-icon');
    let sidebar = document.querySelector('.sidebar');
    let mainpage = document.querySelector('#mainpage');
    console.log(mainpage);

    menuIcon.addEventListener('click',()=>{
        sidebar.classList.toggle('small-sidebar');
        mainpage.classList.toggle('larger-container')
    });
