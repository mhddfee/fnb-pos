import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function Index({ categories }) {
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Daftar Kategori
                </h1>

                <Link
                    href="/categories/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Tambah Kategori
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">No</th>
                            <th className="p-3 text-left">Nama</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id} className="border-t">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{category.name}</td>
                                <td className="p-3">
                                    {category.is_active ? "Aktif" : "Nonaktif"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}