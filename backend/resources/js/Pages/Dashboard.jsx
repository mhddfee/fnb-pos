import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard() {
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-gray-500">Total Produk</h2>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-gray-500">Kategori</h2>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-gray-500">Supplier</h2>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-gray-500">Transaksi Hari Ini</h2>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
            </div>
        </AdminLayout>
    );
}