<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function createNewProduct(Request $request) {
        $input = $request->validate([
            'name' => 'required',
            'type' => 'required',
            'price' => 'required'
        ]);

        Product::create($input);

        return redirect('/main-page')->with('product-created', 'new product was created successfully');
    }

    public function getAllProducts() {
        $allProducts = Product::all();

        return response()->json(["success" => true, "allProducts" => $allProducts]);
    }
}
