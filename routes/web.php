<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('home.home');
});

// home page

Route::post('/signup', [UserController::class, 'signup'])->name('signup');
Route::post('/login', [UserController::class, 'login'])->name('login');

// main page routes.

Route::get('/main-page', function() {
    return view('main_page.main_page');
});

Route::get('/main-page/terms', function() {
    return response()->json(['success' => true]);
})->name('terms');

Route::get('/terms', function() {
    return view('main_page.terms');
});


// Create new product routes.

Route::post('/main-page/create-new-product', [ProductController::class, 'createNewProduct'])->name('create-product');

// get all products route.
Route::get('/get-products', [ProductController::class, 'getAllProducts']);

// logout
Route::post('/logout', [UserController::class, 'logout']);

// Submit order
Route::post('/submit-order', [OrderController::class, 'submitOrder']);


// Get order belonging to logged in user.
Route::get('/get-my-orders', [OrderController::class, 'getMyOrders']);

// Change order status.
Route::post('/change-order-status', [OrderController::class, 'updateOrder']);

// Delete order.
Route::post('/delete-order', [OrderController::class, 'deleteOrder']);


//View order.
Route::get('/view-order/{order}', [OrderController::class, 'viewOrder']);

Route::get('/settings', function(){
    return view('main_page.settings');
});


// update username.
Route::post('/settings/update-name', [UserController::class, 'updateUsername'])->name('update-name');

// update username.
Route::post('/settings/update-email', [UserController::class, 'updateEmail'])->name('update-email');

// update password
Route::post('/settings/update-password', [UserController::class, 'updatePassword'])->name('update-password');
