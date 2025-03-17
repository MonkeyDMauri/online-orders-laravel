import './bootstrap';

if (document.querySelector('body.main-page')) {
    import('./main_page/main.js');
}

if (document.querySelector('body.view-order')) {
    import('./main_page/view-order.js');
}


if (document.querySelector('.user-info-wrapper')) {
    console.log('main_settings.js loaded');
    import('./main_page/main_settings.js');
}
