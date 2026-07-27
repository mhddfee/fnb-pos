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
        $products = Product::where('is_active', true)
            ->with('category')
            ->orderBy('name')
            ->get();

        return Inertia::render('Cashier/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        //
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart' => 'required|array|min:1',
            'total' => 'required|numeric|min:0',
            'paid' => 'required|numeric|gte:total',
        ]);

        DB::transaction(function () use ($validated) {

            $transaction = Transaction::create([
                'invoice' => 'INV-' . now()->format('YmdHis'),
                'user_id' => Auth::id(),
                'total' => $validated['total'],
                'paid' => $validated['paid'],
                'change' => $validated['paid'] - $validated['total'],
            ]);

            foreach ($validated['cart'] as $item) {

                TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $item['id'],
                    'qty' => $item['qty'],
                    'price' => $item['price'],
                    'subtotal' => $item['subtotal'],
                ]);
            }

        });

        return redirect()
            ->route('cashier.index')
            ->with('success', 'Transaksi berhasil disimpan.');
    }

    public function show(Transaction $transaction)
    {
        //
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
