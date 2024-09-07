<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController
{
    public function authenticate(Request $request)
    {
        // Validate the incoming request
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required']
        ]);

        // Manually perform a case-sensitive lookup on the username
        $user = User::whereRaw('BINARY `username` = ?', [$credentials['username']])->first();

        if (!$user || !Auth::attempt(['username' => $user->username, 'password' => $credentials['password']])) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Generate a Sanctum token for the authenticated user
        $token = $user->createToken('auth-token')->plainTextToken;

        // Return the token in the response
        return response()->json([
            'token' => $token,
        ]);
    }


    public function logout(Request $request)
    {
        // Revoke all tokens for the authenticated user
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
