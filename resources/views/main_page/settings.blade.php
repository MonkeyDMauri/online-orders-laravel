@extends('main_page/main_shared/nav-bar')


@section('settings')
<div class="user-info-wrapper">
    <h1 style="font-size:3rem; margin-top:2rem;">Settings</h1>
    <div class="user-info-wrap">
        <div class="info-row">
            <p>User ID: {{auth()->user()->id}}</p>
        </div>
        <hr>
        <div class="info-row">
            <p>Username: {{auth()->user()->name}}</p>

            <div class="dropdown">
                <p class="edit-btn">Edit</p>
                <div class="dropdown-menu">
                    Edit Name
                    <form action="{{route('update-name')}}" method="POST">
                        @csrf
                        <input type="text" placeholder="Enter new name" name="new-name">
                        <button class="save-btn">Save</button>
                    </form>
                    <p>make sure not to use the old one or an already existing one</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="info-row">
            <p>Email: {{auth()->user()->email}}</p>

            <div class="dropdown">
                <p class="edit-btn">Edit</p>
                <div class="dropdown-menu">
                    Edit Email
                    <form action="/settings/update-email" method="POST">
                        @csrf
                        <input type="text" placeholder="Enter new email" name="new-email">
                        <button class="save-btn">Save</button>
                    </form>
                    
                    <p>make sure not to use the old one or an already existing one</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="info-row">
            <p>Created at: {{auth()->user()->created_at}}</p>
        </div>
        <hr>
        <div style="margin:.5rem; cursor: pointer;">
            
            <div class="dropdown">
                <p>Change password</p>
                <div class="dropdown-menu">
                    <form action="{{route('update-password')}}" method="POST">
                        @csrf
                        <div>
                            <h1>Enter current password</h1>
                            <input type="password" name="current_password" placeholder="...">
                        </div>
                        <div>
                            <h1>Enter new password</h1>
                            <input type="password" name="new_password" placeholder="...">
                        </div>
                        <div>
                            <h1>Confirm new password</h1>
                            <input type="password" name="new_password_confirmation" placeholder="...">
                        </div>
                        <button class="save-btn">Save</button>
                    </form>
                </div>
            </div>
        </div>
        <hr>
        
    </div>
    <div class="settings-mssg">
        @if(session('success'))
            <p>{{session('success')}}</p>
        @endif

        @if(session('error'))
            <p>{{session('error')}}</p>
        @endif

        @error('new-name')
            <p>{{$message}}</p>
        @enderror

        @error('new-email')
            <p>{{$message}}</p>
        @enderror
    </div>
</div>
@endsection