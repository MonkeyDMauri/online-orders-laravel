@extends('home.home-layout')

@section('content')
    <h1>Online orders</h1>
            <div style="display: flex; gap:6rem;">
                <div class="signup-wrapper home-box">
                    <h1>Sign Up</h1>
                    <form action="{{route('signup')}}" method="POST">
                        @csrf
                        <div style="display: flex; flex-direction:column; gap:1.5rem; margin-top:1rem;">
                            <input type="text" name="name" placeholder="Username...">
            
                            <input type="text" name="email" placeholder="Email...">
                            
                            <input type="password" name="password" placeholder="Password...">
                        
                        </div>
                        <div style="display:flex; justify-content:center; margin-top:1rem;">
                            <button class="home-form-btn">Log In</button>
                        </div>
                    </form>
                    
                </div>
                <div class="login-wrapper home-box">
                    <h1>Log In</h1>
                    <form action="{{route('login')}}" method="POST">
                        @csrf
                        <div style="display: flex; flex-direction:column; gap:3rem; margin-top:2.5rem;">
                            <input type="text" name="name" placeholder="Username...">
                            <input type="password" name="password" placeholder="Password...">
                        </div>
                        <div style="display:flex; justify-content:center; margin-top:1rem;">
                            <button class="home-form-btn">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
            
@endsection