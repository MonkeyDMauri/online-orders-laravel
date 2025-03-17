<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function submitOrder(Request $request) {
        $data = $request->json()->all();

        $items = $data['items'];

        $order = Order::create([
            'total_price' => $data['orderTotal'],
            'products' => $data['items'],
            'user_id' => auth()->user()->id
        ]);

        return response()->json(['response' => $order, 'success' => true]);
    }

    public function getMyOrders() {
        $myOrders = auth()->user()->orders;

        return response()->json(['success' => true, 'myOrders' => $myOrders]);
    }

    public function updateOrder(Request $request) {
        $input = $request->json()->all(); // Get JSON data
    
        $order = Order::findOrFail($input['orderId']); // Get order dynamically
    

        if ($order->status == 'pending') {
            $order->update([
                'status' => 'completed'
            ]);
        } else {
            $order->update([
                'status' => 'pending'
            ]);
        }
        
    
        return response()->json(['id' => $order->id, 'success' => true]);
    }

    public function deleteOrder(Request $request) {
        $input = $request->json()->all();

        $order = Order::findOrFail($input['orderId']);

        $order->delete();

        return response()->json(['success' => true, 'id' => $input['orderId']]);
    }

    public function viewOrder(Order $order) {
        return view('main_page.view-order', ['order' => $order]);
    }
    
}
