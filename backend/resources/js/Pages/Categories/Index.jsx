import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

export default function Index({ categories }) {

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus kategori ini?")) {
            router.delete(`/categories/${id}`);
        }
    }
    
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

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold">No</th>
                            <th className="px-5 py-3 text-left font-semibold">Nama</th>
                            <th className="px-5 py-3 text-left font-semibold">Deskripsi</th>
                            <th className="px-5 py-3 text-center font-semibold">Status</th>
                            <th className="px-5 py-3 text-center font-semibold">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id} className="border-t hover:bg-gray-50">
                                <td className="px-5 py-4">{index + 1}</td>

                                <td className="px-5 py-4 font-medium">
                                    {category.name}
                                </td>

                                <td className="px-5 py-4">
                                    {category.description || "-"}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            category.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {category.is_active ? "Aktif" : "Nonaktif"}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <Link
                                            href={`/categories/${category.id}/edit`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}