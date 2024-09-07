<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController
{
    // Display a paginated listing of posts
    public function index(Request $request)
    {
        // Define how many posts to show per page (you can adjust this number)
        $perPage = $request->input('perPage', 10); // Default to 10 if not provided

        // Fetch paginated posts, ordered by updated_at
        $posts = Post::orderBy('updated_at', 'desc')->paginate($perPage);

        // Return the paginated posts and additional pagination info
        return response()->json($posts, 200);
    }

    // Store a new post
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'type' => 'required',
            'tags' => []
        ]);

        $post = Post::create($validated);

        return response()->json($post, 201);
    }

    // Display a specific post
    public function show($id)
    {
        return Post::findOrFail($id);
    }

    // Update a post
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'title' => [],
            'content' => [],
            'type' => [],
            'tags' => [],
        ]);

        $post->update($validated);

        return response()->json($post, 200);
    }

    // Delete a post
    public function destroy($id)
    {
        Post::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
