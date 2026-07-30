<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $start = $request->start;
        $end = $request->end;

        $query = Transaction::with('user')
            ->when($start, fn ($q) => $q->whereDate('created_at', '>=', $start))
            ->when($end, fn ($q) => $q->whereDate('created_at', '<=', $end));

        $summary = [
            'transactions' => (clone $query)->count(),
            'revenue' => (clone $query)->sum('total'),
        ];

        $transactions = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Reports/Index', [
            'transactions' => $transactions,
            'summary' => $summary,
            'filters' => [
                'start' => $start,
                'end' => $end,
            ],
        ]);
    }

    public function pdf(Request $request)
    {
        $start = $request->start;
        $end = $request->end;

        $transactions = Transaction::with('user')
            ->when($start, fn ($q) => $q->whereDate('created_at', '>=', $start))
            ->when($end, fn ($q) => $q->whereDate('created_at', '<=', $end))
            ->latest()
            ->get();

        $summary = [
            'transactions' => $transactions->count(),
            'revenue' => $transactions->sum('total'),
        ];

        $pdf = Pdf::loadView('reports.pdf', [
            'transactions' => $transactions,
            'summary' => $summary,
            'start' => $start,
            'end' => $end,
        ]);

        return $pdf->download('laporan-penjualan.pdf');
    }
}