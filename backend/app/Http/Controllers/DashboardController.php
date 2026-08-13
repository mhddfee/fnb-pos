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

        $todayRevenue = Transaction::whereDate('created_at', $today)
            ->sum('total');

        $todayTransactions = Transaction::whereDate('created_at', $today)
            ->count();
        
        $thisWeekRevenue = Transaction::whereBetween('created_at', [
            now()->startOfWeek(),
            now()->endOfWeek(),
        ])->sum('total');

        $lastWeekRevenue = Transaction::whereBetween('created_at', [
            now()->subWeek()->startOfWeek(),
            now()->subWeek()->endOfWeek(),
        ])->sum('total');

        $growth = 0;

        if ($lastWeekRevenue > 0) {
            $growth = (($thisWeekRevenue - $lastWeekRevenue) / $lastWeekRevenue) * 100;
        }

        if ($lastWeekRevenue == 0 && $thisWeekRevenue > 0) {
            $growth = 100;
        }

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

        $recentTransactions = Transaction::with('user')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'categories' => Category::count(),
                'products' => Product::count(),
                'activeProducts' => Product::where('is_active', true)->count(),
                'inactiveProducts' => Product::where('is_active', false)->count(),
                
                'todayRevenue' => $todayRevenue,
                'todayTransactions' => $todayTransactions,
                'thisWeekRevenue' => $thisWeekRevenue,
                'lastWeekRevenue' => $lastWeekRevenue,
                'growth' => round($growth, 1),
                'lowStockCount' => $lowStockProducts->count(),
            ],

            'lowStockProducts' => $lowStockProducts,

            'salesChart' => $salesChart,

            'recentTransactions' => $recentTransactions,
        ]);
    }
}