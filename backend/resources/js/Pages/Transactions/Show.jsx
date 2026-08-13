import {
    ArrowLeft,
    Printer,
    ReceiptText,
    User,
    CalendarDays,
    Wallet,
    Banknote,
    QrCode,
    ShoppingBag,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import Receipt from "@/Components/Receipt";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Show({ transaction }) {
    const receiptRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: receiptRef,
        documentTitle: transaction.invoice,
    });

    return (
        <AdminLayout>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">

                        <ReceiptText className="w-7 h-7"/>

                    </div>

                    <div>

                        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                            Transaction
                        </p>

                        <h1 className="text-4xl font-bold">
                            Detail Transaksi
                        </h1>

                    </div>

                </div>

                <div className="flex gap-3">

                    <Link
                        href="/transactions"
                        className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 px-5 py-3 hover:bg-neutral-100 transition"
                    >

                        <ArrowLeft className="w-5 h-5"/>

                        Kembali

                    </Link>

                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center gap-2 rounded-2xl bg-black text-white px-5 py-3 hover:bg-neutral-800 transition"
                    >

                        <Printer className="w-5 h-5"/>

                        Cetak

                    </button>

                </div>

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Kiri */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden">

                        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 bg-neutral-50">

                            <div className="flex items-center gap-3">

                                <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center">

                                    <ShoppingBag className="w-5 h-5"/>

                                </div>

                                <div>

                                    <h2 className="text-xl font-bold">
                                        Daftar Produk
                                    </h2>

                                    <p className="text-sm text-neutral-500">
                                        {transaction.items.length} item
                                    </p>

                                </div>

                            </div>

                            <span className="text-sm font-semibold text-neutral-500">

                                Total Rp {Number(transaction.total).toLocaleString("id-ID")}

                            </span>

                        </div>

                        <div className="divide-y divide-neutral-200">

                            {transaction.items.map(item => (

                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-6 hover:bg-neutral-50 transition"
                                >

                                    {/* Kiri */}

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {item.product?.name}
                                        </h3>

                                        <p className="text-sm text-neutral-500 mt-1">

                                            {item.qty} × Rp {Number(item.price).toLocaleString("id-ID")}

                                        </p>

                                    </div>

                                    {/* Kanan */}

                                    <div className="text-right">

                                        <p className="text-xs uppercase tracking-widest text-neutral-400">
                                            Subtotal
                                        </p>

                                        <h3 className="text-lg font-bold">

                                            Rp {Number(item.subtotal).toLocaleString("id-ID")}

                                        </h3>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>
                </div>

                {/* Kanan */}
                <div>
                    <div className="bg-white rounded-3xl border border-neutral-200 p-6 sticky top-6 shadow-sm">

                        <h2 className="text-xl font-bold mb-6">
                            Informasi Transaksi
                        </h2>

                        <div className="space-y-5">

                            {/* Invoice */}

                            <div>

                                <p className="text-xs uppercase tracking-widest text-neutral-400">
                                    Invoice
                                </p>

                                <h3 className="font-bold mt-1">
                                    {transaction.invoice}
                                </h3>

                            </div>

                            {/* Kasir */}

                            <div className="flex items-center gap-3">

                                <User className="w-5 h-5 text-neutral-400"/>

                                <div>

                                    <p className="text-xs uppercase tracking-widest text-neutral-400">
                                        Kasir
                                    </p>

                                    <p className="font-semibold">
                                        {transaction.user?.name}
                                    </p>

                                </div>

                            </div>

                            {/* Pembayaran */}

                            <div>

                                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
                                    Pembayaran
                                </p>

                                {transaction.payment_method === "cash" ? (

                                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 px-3 py-2">

                                        <Banknote className="w-4 h-4"/>

                                        Tunai

                                    </span>

                                ) : (

                                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 text-sky-700 px-3 py-2">

                                        <QrCode className="w-4 h-4"/>

                                        QRIS

                                    </span>

                                )}

                            </div>

                            {/* Tanggal */}

                            <div className="flex items-center gap-3">

                                <CalendarDays className="w-5 h-5 text-neutral-400"/>

                                <div>

                                    <p className="text-xs uppercase tracking-widest text-neutral-400">
                                        Tanggal
                                    </p>

                                    <p className="font-semibold">

                                        {new Date(transaction.created_at).toLocaleString("id-ID", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}

                                    </p>

                                </div>

                            </div>

                            <div className="border-t border-neutral-200 mt-8 pt-6 space-y-5">

                                <div className="flex justify-between">

                                    <span className="text-neutral-500">
                                        Total
                                    </span>

                                    <span className="font-bold">
                                        Rp {Number(transaction.total).toLocaleString("id-ID")}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-neutral-500">
                                        Dibayar
                                    </span>

                                    <span className="font-bold">

                                        Rp {Number(transaction.paid).toLocaleString("id-ID")}

                                    </span>

                                </div>

                                <div className="flex justify-between text-lg">

                                    <span className="font-semibold">
                                        Kembalian
                                    </span>

                                    <span className="text-2xl font-bold text-emerald-600">

                                        Rp {Number(transaction.change).toLocaleString("id-ID")}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <div
                style={{
                    position: "absolute",
                    left: "-9999px",
                    top: 0,
                }}
            >
                <div ref={receiptRef}>
                    <Receipt transaction={transaction} />
                </div>
            </div>
        </AdminLayout>
    );
}