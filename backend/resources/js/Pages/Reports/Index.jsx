import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";

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

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">
                Laporan Penjualan
            </h1>

            <form
                onSubmit={filterReport}
                className="bg-white rounded-xl shadow p-5 mb-6 flex gap-4 items-end"
            >
                <div>
                    <label className="block mb-2 font-medium">
                        Tanggal Awal
                    </label>

                    <input
                        type="date"
                        value={data.start}
                        onChange={(e) => setData("start", e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Tanggal Akhir
                    </label>

                    <input
                        type="date"
                        value={data.end}
                        onChange={(e) => setData("end", e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                    Filter
                </button>

                <a
                    href={`/reports/pdf?start=${data.start}&end=${data.end}`}
                    target="_blank"
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                    📄 Export PDF
                </a>
            </form>

            <div className="grid md:grid-cols-2 gap-6 mb-6">

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">
                        Total Transaksi
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {summary.transactions}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">
                        Total Omzet
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        Rp {Number(summary.revenue).toLocaleString("id-ID")}
                    </h2>
                </div>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-5 py-3 text-left">Invoice</th>
                            <th className="px-5 py-3 text-left">Kasir</th>
                            <th className="px-5 py-3 text-right">Total</th>
                            <th className="px-5 py-3 text-center">Tanggal</th>
                        </tr>
                    </thead>

                    <tbody>

                        {transactions.data.map((trx) => (

                            <tr
                                key={trx.id}
                                className="border-t"
                            >
                                <td className="px-5 py-4">
                                    {trx.invoice}
                                </td>

                                <td className="px-5 py-4">
                                    {trx.user?.name}
                                </td>

                                <td className="px-5 py-4 text-right">
                                    Rp {Number(trx.total).toLocaleString("id-ID")}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    {new Date(trx.created_at).toLocaleDateString("id-ID")}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <div className="flex justify-center gap-2 p-4">
                    {transactions.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`px-3 py-2 rounded border ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white hover:bg-gray-100"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>

        </AdminLayout>
    );
}