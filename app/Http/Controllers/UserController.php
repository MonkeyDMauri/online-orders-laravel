<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function signup(Request $request) {
        $input = $request->validate([
            'name' => ['required', 'min:3', Rule::unique('users', 'name')],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'required'
        ]);

        $input["password"] = bcrypt($input['password']);

        $user = User::create($input);

        return redirect()->back()->with('success', 'New user registered successfully!');
    }

    public function login(Request $request) {
        $input = $request->validate([
            'name' => 'required',
            'password' => 'required'
        ]);

        if (auth()->attempt(['name' => $input["name"], 'password' => $input['password']])) {
            $request->session()->regenerate();

            return redirect('/main-page');
        }

        return redirect('/')->with('error', 'check your credentials');
    }

    public function logout() {
        auth()->logout();

        return response()->json(['success' => true]);
    }

    public function updateUsername(Request $request) {
        $input = $request->validate([
            'new-name' => ['required', 'unique:users,name']
        ]);

        $user = auth()->user();
        $user->update([
            'name' => $input['new-name']
        ]);

        return redirect()->back()->with('success', 'Your username has been updated!');
    }

    public function updateEmail(Request $request) {
        $input = $request->validate([
            'new-email' => ['required', 'email', 'unique:users,email']
        ]);

        $user = auth()->user();
        $user->update([
            'email' => $input["new-email"]
        ]);

        return redirect()->back()->with('success', 'your email has been updated');
    }

    public function updatePassword(Request $request) {
        $input = $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|confirmed'
        ]);

        $user = auth()->user();

        if (!Hash::check($input['current_password'], $user->password)) {
            return back()->with('error', 'wrong password');
        }

        $user->update([
            'password' => Hash::make($input['new_password'])
        ]);


        return back()->with('success', 'password has been updated!');
    }
}
