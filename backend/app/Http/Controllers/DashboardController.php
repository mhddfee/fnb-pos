<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'categories' => Category::count(),
                'products' => Product::count(),
                'activeProducts' => Product::where('is_active', true)->count(),
                'inactiveProducts' => Product::where('is_active', false)->count(),
            ],
        ]);
    }
}