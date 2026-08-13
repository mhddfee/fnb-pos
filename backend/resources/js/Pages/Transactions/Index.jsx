import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import {
    Receipt,
    Search,
    Filter,
    CalendarDays,
    Wallet,
    ChartColumn,
    Eye,
    User,
    Banknote,
    QrCode,
    CreditCard,
    ChevronRight,
} from "lucide-react";

export default function Index({ transactions, totalTransactions, stats, }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredTransactions = transactions.data.filter((transaction) => {

        const keyword = search.toLowerCase();

        return (
            transaction.invoice.toLowerCase().includes(keyword) ||
            transaction.user?.name.toLowerCase().includes(keyword)
        );

    });

    return (
        <AdminLayout>
            <div className="flex flex-col gap-3 mb-8">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">

                        <Receipt className="w-7 h-7"/>

                    </div>

                    <div>

                        <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                            Transactions
                        </p>

                        <h1 className="text-4xl font-bold">
                            Riwayat Transaksi
                        </h1>

                    </div>

                </div>

                <p className="text-neutral-500">

                    {totalTransactions} transaksi tersimpan di sistem.

                </p>

            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                {/* Total */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Total Transaksi
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats.total}
                            </h2>

                        </div>

                        <Receipt className="w-8 h-8 text-neutral-700"/>

                    </div>

                </div>

                {/* Hari Ini */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Hari Ini
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats.today}
                            </h2>

                        </div>

                        <CalendarDays className="w-8 h-8 text-neutral-700"/>

                    </div>

                </div>

                {/* Omzet */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Total Omzet
                            </p>

                            <h2 className="text-xl font-bold mt-2">
                                Rp {Number(stats.revenue).toLocaleString("id-ID")}
                            </h2>

                        </div>

                        <Wallet className="w-8 h-8 text-neutral-700"/>

                    </div>

                </div>

                {/* Rata-rata */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Rata-rata
                            </p>

                            <h2 className="text-xl font-bold mt-2">
                                Rp {Number(stats.average).toLocaleString("id-ID")}
                            </h2>

                        </div>

                        <ChartColumn className="w-8 h-8 text-neutral-700"/>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 p-5 mb-8">

                <div className="flex flex-col lg:flex-row gap-4 justify-between">

                    {/* Search */}

                    <div className="relative w-full lg:max-w-md">

                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Cari invoice atau nama kasir..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-2xl border border-neutral-200 pl-12 pr-4 py-3 outline-none focus:border-black transition"
                        />

                    </div>

                    {/* Filter */}

                    <div className="relative">

                        <Filter
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                            size={18}
                        />

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="appearance-none rounded-2xl border border-neutral-200 pl-12 pr-10 py-3 outline-none focus:border-black transition bg-white"
                        >

                            <option value="all">
                                Semua
                            </option>

                            <option value="today">
                                Hari Ini
                            </option>

                            <option value="week">
                                Minggu Ini
                            </option>

                            <option value="month">
                                Bulan Ini
                            </option>

                        </select>

                    </div>

                </div>

            </div>

            <div className="space-y-5">

                {filteredTransactions.map((transaction) => (

                    <div
                        key={transaction.id}
                        className="bg-white rounded-3xl border border-neutral-200 p-6 hover:shadow-lg transition"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-xs uppercase tracking-widest text-neutral-400">
                                    Invoice
                                </p>

                                <h2 className="text-xl font-bold">
                                    {transaction.invoice}
                                </h2>

                            </div>

                            <Link
                                href={`/transactions/${transaction.id}`}
                                className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 px-4 py-2 font-medium hover:bg-neutral-100 hover:shadow-sm transition"
                            >

                                <Eye className="w-4 h-4"/>

                                Detail

                            </Link>

                        </div>

                        {/* Isi */}
                        <div className="grid md:grid-cols-4 gap-5 mt-6">

                            {/* Kasir */}

                            <div>

                                <p className="text-xs text-neutral-400 uppercase">
                                    Kasir
                                </p>

                                <div className="flex items-center gap-2 mt-2">

                                    <User className="w-4 h-4"/>

                                    {transaction.user?.name}

                                </div>

                            </div>

                            {/* Tanggal */}

                            <div>

                                <p className="text-xs text-neutral-400 uppercase">
                                    Tanggal
                                </p>

                                <div className="flex items-center gap-2 mt-2">

                                    <CalendarDays className="w-4 h-4"/>

                                    {new Date(transaction.created_at).toLocaleString("id-ID", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}

                                </div>

                            </div>

                            {/* Pembayaran */}

                            <div>

                                <p className="text-xs text-neutral-400 uppercase">
                                    Pembayaran
                                </p>

                                <div className="mt-2">

                                    {transaction.payment_method === "cash" ? (

                                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 px-3 py-2 text-sm font-medium">

                                            <Banknote className="w-4 h-4"/>

                                            Tunai

                                        </span>

                                    ) : (

                                        <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 text-sky-700 px-3 py-2 text-sm font-medium">

                                            <QrCode className="w-4 h-4"/>

                                            QRIS

                                        </span>

                                    )}

                                </div>

                            </div>

                            {/* Jumlah Item */}

                                <div>

                                    <p className="text-xs uppercase tracking-widest text-neutral-400">
                                        Item
                                    </p>

                                    <p className="mt-2 font-semibold">
                                        {transaction.items.length} Produk
                                    </p>

                                </div>

                            {/* Total */}

                            <div className="text-right">

                                <p className="text-xs text-neutral-400 uppercase">
                                    Total
                                </p>

                                <h2 className="text-3xl font-bold mt-2">

                                    Rp {Number(transaction.total).toLocaleString("id-ID")}

                                </h2>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* Pagination */}

            {transactions.links.length > 3 && (

                <div className="flex justify-center mt-10">

                    <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-2xl p-2 shadow-sm">

                        {transactions.links.map((link, index) => (

                            <Link
                                key={index}
                                href={link.url || "#"}
                                preserveScroll
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                className={`
                                    px-4
                                    py-2
                                    rounded-xl
                                    transition
                                    ${
                                        link.active
                                            ? "bg-black text-white"
                                            : link.url
                                            ? "hover:bg-neutral-100"
                                            : "text-neutral-300 cursor-not-allowed"
                                    }
                                `}
                            />

                        ))}

                    </div>

                </div>

            )}
        </AdminLayout>
    );
}