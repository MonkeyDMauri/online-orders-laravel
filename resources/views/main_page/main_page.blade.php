<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Online orders</title>
    {{-- <script src="{{asset('js.main.js')}}" defer></script> --}}
    <meta name='csrf-token' content='{{csrf_token()}}'>
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
</head>
<body class="main-page">
    @include('main_page.main_shared.nav-bar')
    {{-- style="background-color: white; margin:2rem;" --}}

    <div class="main-greeting">
        <h1>Welcome {{auth()->user()->name}}</h1>
        <h2>{{auth()->user()->email}}</h2>
    </div>
    
    <div class="container">
        <div class="create-product-wrap">
            <h1>Create a new product now</h1>
            <form action="{{route('create-product')}}" method="POST">
                @csrf
                <div class="create-product-form">
                    <div>
                        <label for="product-name">Product name</label>
                        <br>
                        <input type="text" name="name" id="product-name" placeholder="product name...">
                    </div>
                    
                    <div>
                        <label for="product-type">Product Type</label>
                        <br>
                        <select name="type" id="product-type">
                            <option value="drink">drink</option>
                            <option value="protein">protein</option>
                            <option value="carbs">carbs</option>
                            <option value="snacks">snacks</option>
                        </select>
                    </div>
                    <div>
                        <label for="price">Price</label>
                        <br>
                        <input type="number" step="0.01" min="0" name="price" id="price" placeholder="price(e.g 0.99)">
                    </div>
                </div>
                <button>Create</button>
                
                @if (session()->has('product-created'))
                    <h1>{{session('product-created')}}</h1>
                @endif
            </form>
        </div>

        <div class="order-details-wrap">
            <h1 style="font-size: 1.5rem;">My Order</h1>
            <hr>
            <ul class="order-list">
                
                {{-- products added to your order go here --}}
            </ul>
            <div>
                <button class="submit-order-btn">Submit order</button>
                <button class="clear-order-btn">Clear order</button>
                <span class="order-total">
                    {{-- order total goes here --}}
                </span>
            </div>
            
        </div>
    </div>

    <div class="products-wrapper">
        <h1 style="font-size: 2.5rem">Products</h1>

        <div class="products-wrap">
            {{-- list of products goes here --}}
        </div>
    </div>

    {{-- @yield('my-orders') --}}
    <div class="my-orders-wrapper">
        <div class="my-orders-wrap">
            
            <h1>My ordersssss</h1>

            <ul class="my-orders-list">
                {{-- list of my orders go here --}}
            </ul>
        </div>
    </div>

    <div class="logout-popup-wrapper">
        <div class="logout-popup-wrap">Dou you want to logout?</div>
        <div style="display: flex; justify-content:center; gap:2rem;">
            <button class="logout-yes">yes</button>
            <button class="logout-no">no</button>
        </div>
    </div>
</body>
</html>