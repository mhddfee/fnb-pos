import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function Show({ transaction }) {
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Detail Transaksi
                </h1>

                <div className="flex gap-3">
                    <button
                        onClick={() => window.print()}
                        className="print:hidden bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                        🖨 Cetak
                    </button>

                    <Link
                        href="/transactions"
                        style={{ color: "white" }}
                        className="print:hidden bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                    >
                        Kembali
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <p><strong>Invoice:</strong> {transaction.invoice}</p>
                <p><strong>Kasir:</strong> {transaction.user?.name}</p>
                <p><strong>Total:</strong> Rp {Number(transaction.total).toLocaleString("id-ID")}</p>
                <p><strong>Bayar:</strong> Rp {Number(transaction.paid).toLocaleString("id-ID")}</p>
                <p><strong>Kembalian:</strong> Rp {Number(transaction.change).toLocaleString("id-ID")}</p>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-5 py-3 text-left">Produk</th>
                            <th className="px-5 py-3 text-center">Qty</th>
                            <th className="px-5 py-3 text-right">Harga</th>
                            <th className="px-5 py-3 text-right">Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transaction.items.map(item => (
                            <tr key={item.id} className="border-t">
                                <td className="px-5 py-4">
                                    {item.product?.name}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    {item.qty}
                                </td>

                                <td className="px-5 py-4 text-right">
                                    Rp {Number(item.price).toLocaleString("id-ID")}
                                </td>

                                <td className="px-5 py-4 text-right">
                                    Rp {Number(item.subtotal).toLocaleString("id-ID")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}