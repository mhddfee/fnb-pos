import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function Index({ transactions }) {
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Riwayat Transaksi
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-5 py-3 text-left">Invoice</th>
                            <th className="px-5 py-3 text-left">Kasir</th>
                            <th className="px-5 py-3 text-left">Total</th>
                            <th className="px-5 py-3 text-left">Tanggal</th>
                            <th className="px-5 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.data.map(transaction => (
                            <tr key={transaction.id} className="border-t">
                                <td className="px-5 py-4">
                                    {transaction.invoice}
                                </td>

                                <td className="px-5 py-4">
                                    {transaction.user?.name}
                                </td>

                                <td className="px-5 py-4">
                                    Rp {Number(transaction.total).toLocaleString("id-ID")}
                                </td>

                                <td className="px-5 py-4">
                                    {transaction.created_at}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <Link
                                        href={`/transactions/${transaction.id}`}
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}