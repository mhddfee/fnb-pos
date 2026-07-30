<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/cashier', [CashierController::class, 'index'])
        ->name('cashier.index');

    Route::post('/cashier', [CashierController::class, 'store'])
        ->name('cashier.store');

    Route::resource('transactions', TransactionController::class)
        ->only(['index', 'show']);

});

Route::middleware(['auth', 'admin'])->group(function () {

    Route::resource('categories', CategoryController::class)
        ->except(['show']);

    Route::resource('products', ProductController::class)
        ->except(['show']);

    Route::resource('suppliers', SupplierController::class)
        ->except(['show']);

    Route::get('/reports', [ReportController::class, 'index'])
        ->name('reports.index');

    Route::get('/reports/pdf', [ReportController::class, 'pdf'])
        ->name('reports.pdf');

    Route::get('/products/{product}/restock', [ProductController::class, 'restock'])
        ->name('products.restock');

    Route::put('/products/{product}/restock', [ProductController::class, 'updateStock'])
        ->name('products.updateStock');

    Route::resource('users', UserController::class)
        ->except(['show']);

});

require __DIR__.'/auth.php';
