
<div style="margin-top:1rem;">
    @error('name')
        <p class="home-form-error-mssg">{{$message}}</p>
    @enderror
    @error('email')
        <p class="home-form-error-mssg">{{$message}}</p>
    @enderror
    @error('password')
        <p class="home-form-error-mssg">{{$message}}</p>
    @enderror
</div>