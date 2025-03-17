    
@vite('resources/js/app.js')
@vite('resources/css/app.css')
<nav class="main-nav-bar">
            
    <h1 class="home-btn">Online orders</h1>
        

    <ul class="nav-links">
        <li class="terms-link">terms</li>
        <li class="settings-btn">settings</li>
        <li class="logout-btn">logout</li>
    </ul>
</nav>
@yield('terms')
@yield('settings')