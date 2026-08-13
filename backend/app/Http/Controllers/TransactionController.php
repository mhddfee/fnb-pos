<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{

    public function index()
    {
        $transactions = Transaction::with([
            'user',
            'items',
        ])
        ->latest()
        ->paginate(10);

        $todayTransactions = Transaction::whereDate(
            'created_at',
            today()
        )->count();

        $totalRevenue = Transaction::sum('total');

        $averageTransaction = Transaction::avg('total');

        return Inertia::render('Transactions/Index', [

            'transactions' => $transactions,

            'totalTransactions' => Transaction::count(),

            'stats' => [

                'total' => Transaction::count(),

                'today' => $todayTransactions,

                'revenue' => $totalRevenue,

                'average' => round($averageTransaction),

            ],

        ]);
    }

    public function create()
    {
        //
    }
    
    public function show(Transaction $transaction)
    {
        $transaction->load([
            'user',
            'items.product',
        ]);

        return Inertia::render('Transactions/Show', [
            'transaction' => $transaction,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
