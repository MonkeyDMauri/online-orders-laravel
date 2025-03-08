<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Online orders</title>
    @vite('resources/css/app.css')
    {{-- @vite('resources/css/home_style/home.css') --}}
    {{-- <link rel="stylesheet" href="{{asset('resources/css/home_style/home.css')}}"> --}}
</head>
<body class="home-class">
    
    <div class="main-wrapper">
        <div class="main-wrap">
            @yield('content')
        </div>
        
        @include('home.home-error-messages')
        
        @if(session('success'))
            <p style="color:white; margin-top:1rem;">{{session('success')}}</p>
        @elseif(session('error'))
            <p style="color:rgb(212, 0, 0); margin-top:1rem;">{{session('error')}}</p>
        @endif
    </div>
</body>
</html>