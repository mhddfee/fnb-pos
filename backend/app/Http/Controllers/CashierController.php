<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CashierController extends Controller
{
    public function index()
    {
        $products = Product::with('category')
            ->where('is_active', true)
            ->where('stock', '>', 0)
            ->orderBy('name')
            ->get();

        return Inertia::render('Cashier/Index', [
            'products' => $products,
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart' => 'required|array|min:1',
            'total' => 'required|numeric|min:0',
            'paid' => 'required|numeric|gte:total',
        ]);

        try {

            DB::transaction(function () use ($validated) {

                $transaction = Transaction::create([
                    'invoice' => 'INV-' . now()->format('YmdHis'),
                    'user_id' => Auth::id(),
                    'total' => $validated['total'],
                    'paid' => $validated['paid'],
                    'change' => $validated['paid'] - $validated['total'],
                ]);

                foreach ($validated['cart'] as $item) {

                    $product = Product::findOrFail($item['id']);

                    if ($product->stock < $item['qty']) {
                        throw new \Exception("Stok {$product->name} tidak mencukupi.");
                    }

                    TransactionItem::create([
                        'transaction_id' => $transaction->id,
                        'product_id' => $item['id'],
                        'qty' => $item['qty'],
                        'price' => $item['price'],
                        'subtotal' => $item['subtotal'],
                    ]);

                    // Kurangi stok
                    $product->decrement('stock', $item['qty']);
                }
            });

            return redirect()
                ->route('cashier.index')
                ->with('success', 'Transaksi berhasil disimpan.');

        } catch (\Exception $e) {

            return back()->with('error', $e->getMessage());

        }
    }
}