import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";

export default function Index({ suppliers, filters }) {
    const { data, setData, get } = useForm({
        search: filters.search || "",
    });

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus supplier ini?")) {
            router.delete(`/suppliers/${id}`);
        }
    }

    function handleSearch(e) {
        e.preventDefault();

        get("/suppliers", {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Daftar Supplier
                </h1>

                <Link
                    href="/suppliers/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Tambah Supplier
                </Link>
            </div>

            <form
                onSubmit={handleSearch}
                className="mb-5 flex gap-3"
            >
                <input
                    type="text"
                    placeholder="Cari supplier..."
                    value={data.search}
                    onChange={(e) =>
                        setData("search", e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 w-80"
                />

                <button
                    type="submit"
                    className="bg-slate-800 text-white px-4 rounded-lg"
                >
                    Cari
                </button>
            </form>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold">No</th>
                            <th className="px-5 py-3 text-left font-semibold">Nama</th>
                            <th className="px-5 py-3 text-left font-semibold">Telepon</th>
                            <th className="px-5 py-3 text-left font-semibold">Email</th>
                            <th className="px-5 py-3 text-center font-semibold">Status</th>
                            <th className="px-5 py-3 text-center font-semibold">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {suppliers.data.map((supplier, index) => (
                            <tr
                                key={supplier.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-5 py-4">
                                    {index + 1}
                                </td>

                                <td className="px-5 py-4 font-medium">
                                    {supplier.name}
                                </td>

                                <td className="px-5 py-4">
                                    {supplier.phone || "-"}
                                </td>

                                <td className="px-5 py-4">
                                    {supplier.email || "-"}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            supplier.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {supplier.is_active
                                            ? "Aktif"
                                            : "Nonaktif"}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <Link
                                            href={route(
                                                "suppliers.edit",
                                                supplier.id
                                            )}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(supplier.id)
                                            }
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

                <div className="flex justify-center gap-2 p-4">
                    {suppliers.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() =>
                                link.url && router.visit(link.url)
                            }
                            className={`px-3 py-2 rounded border ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white hover:bg-gray-100"
                            } ${
                                !link.url
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}