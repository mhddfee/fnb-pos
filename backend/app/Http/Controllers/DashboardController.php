<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Transaction;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();

        $todayRevenue = \App\Models\Transaction::whereDate('created_at', $today)
            ->sum('total');

        $todayTransactions = \App\Models\Transaction::whereDate('created_at', $today)
            ->count();

        $lowStockProducts = Product::where('stock', '<=', 5)
            ->where('is_active', true)
            ->orderBy('stock')
            ->take(5)
            ->get();

        $salesChart = collect();

        for ($i = 6; $i >= 0; $i--) {

            $date = Carbon::today()->subDays($i);

            $salesChart->push([
                'date' => $date->translatedFormat('D'),
                'total' => \App\Models\Transaction::whereDate('created_at', $date)
                    ->sum('total'),
            ]);

        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'categories' => Category::count(),
                'products' => Product::count(),
                'activeProducts' => Product::where('is_active', true)->count(),
                'inactiveProducts' => Product::where('is_active', false)->count(),

                'todayRevenue' => $todayRevenue,
                'todayTransactions' => $todayTransactions,
                'lowStockCount' => $lowStockProducts->count(),
            ],

            'lowStockProducts' => $lowStockProducts,

            'salesChart' => $salesChart,
        ]);
    }
}