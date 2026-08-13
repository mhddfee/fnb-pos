import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import {
    BarChart3,
    CalendarDays,
    FileDown,
    ReceiptText,
    Wallet,
    ArrowUpRight,
    Filter,
} from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function Index({ transactions, summary, filters }) {
    const { data, setData } = useForm({
        start: filters.start || "",
        end: filters.end || "",
    });

    function filterReport(e) {
        e.preventDefault();

        router.get("/reports", data, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function resetFilter() {
        setData("start", "");
        setData("end", "");

        router.get(
            "/reports",
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }

    return (
        <AdminLayout>

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                        <BarChart3 className="w-7 h-7" />
                    </div>

                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                            Reports
                        </p>

                        <h1 className="text-4xl font-bold">
                            Laporan Penjualan
                        </h1>

                        <p className="text-neutral-500 mt-1">
                            Pantau transaksi dan omzet penjualan.
                        </p>
                    </div>

                </div>

            </div>


            {/* FILTER */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 mb-6">

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                        <Filter className="w-5 h-5" />
                    </div>

                    <div>
                        <h2 className="font-bold text-lg">
                            Filter Laporan
                        </h2>

                        <p className="text-sm text-neutral-500">
                            Tentukan periode laporan yang ingin ditampilkan.
                        </p>
                    </div>

                </div>


                <form
                    onSubmit={filterReport}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-end"
                >

                    {/* Tanggal Awal */}
                    <div>

                        <label className="block text-sm font-semibold mb-2">
                            Tanggal Awal
                        </label>

                        <div className="relative">

                            <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />

                            <input
                                type="date"
                                value={data.start}
                                onChange={(e) =>
                                    setData("start", e.target.value)
                                }
                                className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                            />

                        </div>

                    </div>


                    {/* Tanggal Akhir */}
                    <div>

                        <label className="block text-sm font-semibold mb-2">
                            Tanggal Akhir
                        </label>

                        <div className="relative">

                            <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />

                            <input
                                type="date"
                                value={data.end}
                                onChange={(e) =>
                                    setData("end", e.target.value)
                                }
                                className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                            />

                        </div>

                    </div>


                    {/* Filter */}
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white px-5 py-3 rounded-xl font-semibold transition"
                    >
                        <Filter className="w-4 h-4" />
                        Terapkan Filter
                    </button>


                    {/* Reset */}
                    <button
                        type="button"
                        onClick={resetFilter}
                        className="inline-flex items-center justify-center gap-2 border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 px-5 py-3 rounded-xl font-semibold transition"
                    >
                        Reset
                    </button>

                </form>


                {/* PDF */}
                <div className="mt-5 pt-5 border-t border-neutral-100 flex justify-end">

                    <a
                        href={`/reports/pdf?start=${data.start}&end=${data.end}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                    >
                        <FileDown className="w-4 h-4" />
                        Export PDF
                    </a>

                </div>

            </div>


            {/* SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

                {/* Total Transaksi */}
                <div className="bg-white border border-neutral-200 rounded-3xl p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-medium text-neutral-500">
                                Total Transaksi
                            </p>

                            <h2 className="text-4xl font-bold mt-2">
                                {summary.transactions}
                            </h2>

                            <div className="flex items-center gap-1 mt-3 text-sm text-neutral-500">
                                <ReceiptText className="w-4 h-4" />
                                Transaksi pada periode terpilih
                            </div>

                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <ReceiptText className="w-6 h-6" />
                        </div>

                    </div>

                </div>


                {/* Total Omzet */}
                <div className="bg-white border border-neutral-200 rounded-3xl p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-medium text-neutral-500">
                                Total Omzet
                            </p>

                            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-green-600">
                                Rp{" "}
                                {Number(summary.revenue).toLocaleString(
                                    "id-ID"
                                )}
                            </h2>

                            <div className="flex items-center gap-1 mt-3 text-sm text-neutral-500">
                                <ArrowUpRight className="w-4 h-4" />
                                Pendapatan dari transaksi
                            </div>

                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                            <Wallet className="w-6 h-6" />
                        </div>

                    </div>

                </div>

            </div>


            {/* TRANSACTION TABLE */}
            <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden">

                <div className="px-6 py-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>

                        <h2 className="text-xl font-bold">
                            Detail Transaksi
                        </h2>

                        <p className="text-sm text-neutral-500 mt-1">
                            Daftar transaksi berdasarkan filter yang dipilih.
                        </p>

                    </div>

                    <div className="flex items-center gap-2 text-sm text-neutral-500">

                        <ReceiptText className="w-4 h-4" />

                        {transactions.total} transaksi

                    </div>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full min-w-[750px]">

                        <thead className="bg-neutral-50">

                            <tr>

                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                    Invoice
                                </th>

                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                    Kasir
                                </th>

                                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                    Total
                                </th>

                                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                    Tanggal
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {transactions.data.length > 0 ? (

                                transactions.data.map((trx) => (

                                    <tr
                                        key={trx.id}
                                        className="border-t border-neutral-100 hover:bg-neutral-50 transition"
                                    >

                                        {/* Invoice */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                                                    <ReceiptText className="w-5 h-5 text-neutral-500" />
                                                </div>

                                                <div>

                                                    <p className="font-semibold">
                                                        {trx.invoice}
                                                    </p>

                                                    <p className="text-xs text-neutral-500">
                                                        Transaksi #{trx.id}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Kasir */}
                                        <td className="px-6 py-5">

                                            <span className="text-neutral-700">
                                                {trx.user?.name || "-"}
                                            </span>

                                        </td>


                                        {/* Total */}
                                        <td className="px-6 py-5 text-right">

                                            <span className="font-bold text-green-600">
                                                Rp{" "}
                                                {Number(
                                                    trx.total
                                                ).toLocaleString("id-ID")}
                                            </span>

                                        </td>


                                        {/* Tanggal */}
                                        <td className="px-6 py-5 text-center">

                                            <div className="inline-flex items-center gap-2 text-neutral-600">

                                                <CalendarDays className="w-4 h-4 text-neutral-400" />

                                                {new Date(
                                                    trx.created_at
                                                ).toLocaleDateString(
                                                    "id-ID"
                                                )}

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="px-6 py-16 text-center"
                                    >

                                        <div className="flex flex-col items-center">

                                            <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                                                <BarChart3 className="w-7 h-7 text-neutral-400" />
                                            </div>

                                            <p className="font-semibold text-lg">
                                                Tidak ada transaksi
                                            </p>

                                            <p className="text-sm text-neutral-500 mt-1">
                                                Tidak ditemukan transaksi pada periode yang dipilih.
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* Pagination */}
                {transactions.links &&
                    transactions.links.length > 3 && (

                        <div className="flex flex-wrap justify-center gap-2 p-5 border-t border-neutral-200">

                            {transactions.links.map((link, index) => (

                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() =>
                                        link.url &&
                                        router.visit(link.url)
                                    }
                                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${
                                        link.active
                                            ? "bg-black text-white border-black"
                                            : "bg-white hover:bg-neutral-100 border-neutral-200"
                                    } ${
                                        !link.url
                                            ? "opacity-40 cursor-not-allowed"
                                            : ""
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />

                            ))}

                        </div>

                    )}

            </div>

        </AdminLayout>
    );
}