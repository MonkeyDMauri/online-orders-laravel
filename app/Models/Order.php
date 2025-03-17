<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = ['user_id', 'total_price', 'products', 'status'];

    // this converts the items json string into an assc=ociative array only when retreiving the items not when storing them.
    protected $casts = [
        'products' => 'array'
    ];
}
