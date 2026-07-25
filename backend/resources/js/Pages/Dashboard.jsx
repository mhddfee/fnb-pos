import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ stats }) {
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">
                        Total Kategori
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {stats.categories}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">
                        Total Produk
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {stats.products}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">
                        Produk Aktif
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-green-600">
                        {stats.activeProducts}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500">
                        Produk Nonaktif
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-red-600">
                        {stats.inactiveProducts}
                    </h2>
                </div>

            </div>
        </AdminLayout>
    );
}