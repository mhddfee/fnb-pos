<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Penjualan</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
        }

        h2 {
            text-align: center;
            margin-bottom: 5px;
        }

        p {
            margin: 3px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table,
        th,
        td {
            border: 1px solid #444;
        }

        th {
            background: #f0f0f0;
        }

        th,
        td {
            padding: 8px;
        }

        .right {
            text-align: right;
        }

        .center {
            text-align: center;
        }

        .summary {
            margin-top: 20px;
        }
    </style>
</head>

<body>

    <h2>LAPORAN PENJUALAN</h2>

    <p>
        <strong>Periode :</strong>
        {{ $start ?: '-' }}
        s/d
        {{ $end ?: '-' }}
    </p>

    <table>
        <thead>
            <tr>
                <th>Invoice</th>
                <th>Kasir</th>
                <th>Total</th>
                <th>Tanggal</th>
            </tr>
        </thead>

        <tbody>

            @foreach($transactions as $trx)

                <tr>
                    <td>{{ $trx->invoice }}</td>

                    <td>{{ $trx->user->name ?? '-' }}</td>

                    <td class="right">
                        Rp {{ number_format($trx->total,0,',','.') }}
                    </td>

                    <td class="center">
                        {{ $trx->created_at->format('d-m-Y') }}
                    </td>
                </tr>

            @endforeach

        </tbody>
    </table>

    <div class="summary">

        <p>
            <strong>Total Transaksi :</strong>
            {{ $summary['transactions'] }}
        </p>

        <p>
            <strong>Total Omzet :</strong>
            Rp {{ number_format($summary['revenue'],0,',','.') }}
        </p>

    </div>

</body>

</html>