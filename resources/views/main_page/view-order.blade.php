<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>View Order</title>
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
</head>
<body class="view-order">
    
    <div class="order-wrap test">
        <h1>Order ID:{{$order->id}}</h1>
        {{-- <pre>{{ print_r($order->products) }}</pre> --}}

        <?php
            $products = $order->products;
        ?>

        <div class="ul">
            @foreach ($products as $product)
                <li>{{$product['itemName']}}</li>
            @endforeach
        </div>

        <p><a href="/main-page">Go back</a></p>
    </div>
</body>
</html>