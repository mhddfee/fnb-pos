import {
    DollarSign,
    ShoppingCart,
    Package,
    FolderOpen,
    CheckCircle2,
    XCircle,
    TriangleAlert,
    Boxes,
    ReceiptText,
    PackageCheck,
    PackageX,
    Activity,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage, Link } from "@inertiajs/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function Dashboard({
    stats,
    lowStockProducts,
    salesChart,
    recentTransactions,
}) {
    const { auth } = usePage().props;
    const isGrowthUp = stats.growth >= 0;

    const chartData = {
        labels: salesChart.map(item => item.date),

        datasets: [

            {

                data: salesChart.map(item => item.total),

                borderColor: "#111111",

                backgroundColor: "rgba(17,17,17,.08)",

                fill: true,

                tension: .45,

                pointRadius: 5,

                pointHoverRadius: 7,

                pointBackgroundColor: "#111111",

                pointBorderWidth: 0,

            },

        ],

    };

    const chartOptions = {

        responsive:true,

        maintainAspectRatio:false,

        interaction:{
            intersect:false,
            mode:"index",
        },

        plugins:{

            legend:{
                display:false,
            },

            tooltip:{
                backgroundColor:"#111",
                padding:16,
                cornerRadius:16,
                displayColors:false,
            }

        },

        scales:{

            x:{
                grid:{
                    display:false,
                },
                border:{
                    display:false,
                }
            },

            y:{
                beginAtZero:true,

                grid:{
                    color:"#f3f3f3",
                },

                border:{
                    display:false,
                }
            }

        }

    }

    return (
        <AdminLayout>
            <div className="flex flex-col gap-6 w-full">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

                    <div className="xl:col-span-2">

                        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                            Dashboard
                        </p>

                        <h1 className="text-3xl md:text-3xl md:text-5xl font-bold text-neutral-900 mt-2">
                            Selamat Datang, {auth.user.name}
                        </h1>

                        <p className="text-neutral-500 mt-3 text-base">
                            Ringkasan aktivitas sistem hari ini.
                        </p>

                    </div>

                    <div className="w-full bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm overflow-hidden">

                        <div className="flex items-center justify-between mb-5">

                            <div>
                                <p className="text-xs uppercase tracking-widest text-neutral-500">
                                    Status Produk
                                </p>

                                <h3 className="text-lg font-semibold mt-1">
                                    Inventory
                                </h3>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center">
                                <Boxes className="w-6 h-6 text-neutral-800" />
                            </div>

                        </div>

                        <div className="space-y-4">

                            <div className="flex flex-wrap items-center justify-between gap-4">

                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                                    <span className="text-neutral-600">
                                        Produk Aktif
                                    </span>
                                </div>

                                <span className="font-bold text-lg">
                                    {stats.activeProducts}
                                </span>

                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">

                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                    <span className="text-neutral-600">
                                        Nonaktif
                                    </span>
                                </div>

                                <span className="font-bold text-lg">
                                    {stats.inactiveProducts}
                                </span>

                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">

                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                                    <span className="text-neutral-600">
                                        Low Stock
                                    </span>
                                </div>

                                <span className="font-bold text-lg text-yellow-600">
                                    {stats.lowStockCount}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                {/* Omzet */}
                <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                    <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-neutral-100 blur-3xl" />

                        <div className="relative flex items-start justify-between gap-4">

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-500 truncate">
                                    Omzet Hari Ini
                                </p>

                                <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight break-words">
                                    Rp&nbsp;{Number(stats.todayRevenue).toLocaleString("id-ID")}
                                </h2>
                            </div>

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
                                <DollarSign size={26} />
                            </div>

                        </div>

                </div>

                {/* Transaksi */}
                <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                    <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-neutral-100 blur-3xl" />

                    <div className="relative flex items-start justify-between">

                        <div className="flex-1 min-w-0">

                            <p className="text-sm font-medium text-neutral-500">
                                Transaksi Hari Ini
                            </p>

                            <h2 className="mt-4 text-4xl font-bold">
                                {stats.todayTransactions}
                            </h2>

                        </div>

                        <div className="ml-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
                            <ShoppingCart size={26} />
                        </div>

                    </div>

                </div>

                {/* Kategori */}
                <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                    <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-neutral-100 blur-3xl" />

                    <div className="relative flex items-start justify-between">

                        <div className="flex-1 min-w-0">

                            <p className="text-sm font-medium text-neutral-500">
                                Total Kategori
                            </p>

                            <h2 className="mt-4 text-4xl font-bold">
                                {stats.categories}
                            </h2>

                        </div>

                        <div className="ml-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
                            <FolderOpen size={26} />
                        </div>

                    </div>

                </div>

                {/* Produk */}
                <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                    <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-neutral-100 blur-3xl" />

                    <div className="relative flex items-start justify-between">

                        <div className="flex-1 min-w-0">

                            <p className="text-sm font-medium text-neutral-500">
                                Total Produk
                            </p>

                            <h2 className="mt-4 text-4xl font-bold">
                                {stats.products}
                            </h2>

                        </div>

                        <div className="ml-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
                            <Package size={26} />
                        </div>

                    </div>

                </div>

            </div>
                
                <div className="w-full bg-white rounded-3xl border border-neutral-200 p-7 overflow-hidden">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                        <div>

                            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                                Analytics
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                Penjualan 7 Hari Terakhir
                            </h2>

                            <p className="text-neutral-500 mt-2">
                                Performa penjualan selama satu minggu terakhir.
                            </p>

                        </div>

                        <div className="flex items-center gap-5">

                            <div
                                className={`rounded-2xl border px-5 py-4 min-w-[180px] ${
                                    isGrowthUp
                                        ? "border-emerald-200 bg-emerald-50"
                                        : "border-red-200 bg-red-50"
                                }`}
                            >
                                <p
                                    className={`text-xs uppercase tracking-widest ${
                                        isGrowthUp
                                            ? "text-emerald-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    Growth
                                </p>

                                <div className="mt-2 flex items-center gap-2">

                                    {isGrowthUp ? (
                                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                                    ) : (
                                        <TrendingDown className="w-5 h-5 text-red-600" />
                                    )}

                                    <span className="text-2xl font-bold text-neutral-900">
                                        {isGrowthUp ? "+" : ""}
                                        {stats.growth}%
                                    </span>

                                </div>

                                <p
                                    className={`text-sm mt-1 ${
                                        isGrowthUp
                                            ? "text-emerald-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    Revenue 7 hari terakhir
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Chart */}
                    <div className="h-[260px] sm:h-[320px] lg:h-[380px]">

                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,

                                plugins: {

                                    legend: {
                                        display: false,
                                    },

                                    tooltip: {
                                        backgroundColor: "#111111",
                                        padding: 14,
                                        cornerRadius: 12,
                                        displayColors: false,
                                    },
                                },

                                scales: {

                                    x: {

                                        grid: {
                                            display: false,
                                        },

                                        border: {
                                            display: false,
                                        },

                                        ticks: {
                                            color: "#737373",
                                            font: {
                                                size: 12,
                                            },
                                        },
                                    },

                                    y: {

                                        beginAtZero: true,

                                        grid: {
                                            color: "#F3F4F6",
                                        },

                                        border: {
                                            display: false,
                                        },

                                        ticks: {
                                            color: "#737373",
                                        },
                                    },
                                },
                            }}
                        />

                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                    {/* Produk Hampir Habis */}
                    <div className="w-full bg-white rounded-3xl border border-neutral-200 p-6 overflow-hidden">

                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

                            <h2 className="text-xl font-semibold">
                                Produk Hampir Habis
                            </h2>

                            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                <Boxes className="w-5 h-5 text-red-600"/>
                            </div>

                        </div>

                        {lowStockProducts.length === 0 ? (
                            <p className="text-gray-500">
                                Semua stok produk masih aman.
                            </p>
                        ) : (
                            <div className="space-y-3">

                                {lowStockProducts.map((product) => (

                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0"
                                    >
                                        <span>{product.name}</span>

                                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                                            {product.stock}
                                        </span>
                                    </div>

                                ))}

                            </div>
                        )}

                    </div>

                    {/* Transaksi Terbaru */}
                    <div className="w-full bg-white rounded-3xl border border-neutral-200 p-6 overflow-hidden">

                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

                            <h2 className="text-xl font-semibold">
                                Transaksi Terbaru
                            </h2>

                            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                                <ReceiptText className="w-5 h-5"/>
                            </div>

                        </div>

                        {recentTransactions.length === 0 ? (
                            <p className="text-gray-500">
                                Belum ada transaksi.
                            </p>
                        ) : (
                            <div className="space-y-3">

                                {recentTransactions.map((trx) => (

                                    <div
                                        key={trx.id}
                                        className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0"
                                    >
                                        <div>

                                            <p className="font-semibold text-neutral-900">
                                                {trx.invoice}
                                            </p>

                                            <p className="text-sm text-neutral-500">
                                                {trx.user?.name}
                                            </p>

                                        </div>

                                        <span className="font-bold text-lg">
                                            Rp {Number(trx.total).toLocaleString("id-ID")}
                                        </span>

                                    </div>

                                ))}

                            </div>
                        )}

                    </div>

                </div>
            </div>                
        </AdminLayout>
    );
}