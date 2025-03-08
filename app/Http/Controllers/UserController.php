<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
}
