import AdminLayout from "@/Layouts/AdminLayout";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function Dashboard({
    stats,
    lowStockProducts,
    salesChart,
}) {
    const chartData = {
        labels: salesChart.map(item => item.date),
        datasets: [
            {
                label: "Omzet",
                data: salesChart.map(item => item.total),
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-center">
                        💰 Omzet Hari Ini
                    </p>

                    <h2 className="text-2xl text-center font-bold mt-2 text-green-600">
                        Rp {Number(stats.todayRevenue).toLocaleString("id-ID")}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-center">
                        🧾 Transaksi Hari Ini
                    </p>

                    <h2 className="text-4xl text-center font-bold mt-2 text-blue-600">
                        {stats.todayTransactions}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-center">
                        📂 Total Kategori
                    </p>

                    <h2 className="text-4xl text-center font-bold mt-2">
                        {stats.categories}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-center">
                        📦 Total Produk
                    </p>

                    <h2 className="text-4xl text-center font-bold mt-2">
                        {stats.products}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-center">
                        ✅ Produk Aktif
                    </p>

                    <h2 className="text-4xl text-center font-bold mt-2 text-green-600">
                        {stats.activeProducts}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-center">
                        ❌ Produk Nonaktif
                    </p>

                    <h2 className="text-4xl text-center font-bold mt-2 text-red-600">
                        {stats.inactiveProducts}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500 text-center">
                        ⚠️ Produk Hampir Habis
                    </p>

                    <h2 className="text-4xl text-center font-bold mt-2 text-orange-500">
                        {stats.lowStockCount}
                    </h2>

                    <p className="text-sm text-center text-gray-500 mt-2">
                        Stok ≤ 5
                    </p>
                </div>

            </div>

            <div className="bg-white rounded-xl shadow p-6 mt-8">

                <h2 className="text-xl font-bold mb-4">
                    ⚠️ Daftar Produk Hampir Habis
                </h2>

                {lowStockProducts.length === 0 ? (
                    <p className="text-gray-500">
                        Semua stok produk masih aman.
                    </p>
                ) : (
                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>
                                <th className="text-left px-4 py-3">
                                    Produk
                                </th>

                                <th className="text-center px-4 py-3">
                                    Stok
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {lowStockProducts.map((product) => (

                                <tr
                                    key={product.id}
                                    className="border-t"
                                >

                                    <td className="px-4 py-3">
                                        {product.name}
                                    </td>

                                    <td className="text-center px-4 py-3 font-bold text-red-600">
                                        {product.stock}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                )}

            </div>

            <div className="bg-white rounded-xl shadow p-6 mt-8">

                <h2 className="text-xl font-bold mb-6">
                    📈 Penjualan 7 Hari Terakhir
                </h2>

                <Bar
                    data={chartData}
                    options={chartOptions}
                />

            </div>

        </AdminLayout>
    );
}