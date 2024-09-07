<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// Public GET route for posts
Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{post}', [PostController::class, 'show']);

// Protected routes for creating, updating, and deleting posts
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('posts', [PostController::class, 'store']);
    Route::put('posts/{post}', [PostController::class, 'update']);
    Route::delete('posts/{post}', [PostController::class, 'destroy']);

    Route::post('/logout', [LoginController::class, 'logout']);
});

// Authentication routes
Route::post('/login', [LoginController::class, 'authenticate']);
