<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Enums\PaymentMethod;
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
            ->orderBy('name')
            ->get();

        return Inertia::render('Cashier/Index', [
            'products' => Product::where('is_active', true)
                ->with('category')
                ->get(),

            'categories' => Category::orderBy('name')->get(),
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart' => 'required|array|min:1',
            'total' => 'required|numeric|min:0',

            'payment_method' => [
                'required',
                'in:' . implode(',', PaymentMethod::values()),
            ],

            'paid' => 'nullable|numeric',
        ]);

        try {

            if ($validated['payment_method'] === 'cash') {

                if ($validated['paid'] < $validated['total']) {

                    return back()->with(
                        'error',
                        'Uang yang dibayarkan kurang.'
                    );

                }

            } else {

                $validated['paid'] = $validated['total'];

            }

            DB::transaction(function () use ($validated) {

                $transaction = Transaction::create([
                    'invoice' => 'INV-' . now()->format('YmdHis'),
                    'user_id' => Auth::id(),
                    'total' => $validated['total'],
                    'paid' => $validated['paid'],
                    'change' => $validated['paid'] - $validated['total'],
                    'payment_method' => $validated['payment_method'],
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