import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm, } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ products, filters }) {
    const { data, setData, get } = useForm({
        search: filters.search || "",
    });

    function handleSearch(e) {
        e.preventDefault();

        get("/products", {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus produk ini?")) {
            router.delete(`/products/${id}`);
        }
    }
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Daftar Produk
                </h1>

                <div className="flex gap-3">
                    <form
                        onSubmit={handleSearch}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            value={data.search}
                            onChange={(e)=>setData("search", e.target.value)}
                            placeholder="Cari produk..."
                            className="border rounded-lg px-3 py-2"
                        />

                        <button
                            className="bg-slate-800 text-white px-4 rounded-lg"
                        >
                            Cari
                        </button>
                    </form>

                    <Link
                        href="/products/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        + Tambah Produk
                    </Link>
                </div>
                
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-5 py-3 text-left">No</th>
                            <th className="px-5 py-3 text-center font-semibold">Gambar</th>
                            <th className="px-5 py-3 text-left">Produk</th>
                            <th className="px-5 py-3 text-left">Kategori</th>
                            <th className="px-5 py-3 text-left">Harga</th>
                            <th className="px-5 py-3 text-center font-semibold">Stok</th>
                            <th className="px-5 py-3 text-center">Status</th>
                            <th className="px-5 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.data.map((product, index) => (
                            <tr
                                key={product.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-5 py-4">
                                    {index + 1}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    {product.image ? (
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg border mx-auto"
                                        />
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>

                                <td className="px-5 py-4 font-medium">
                                    {product.name}
                                </td>

                                <td className="px-5 py-4">
                                    {product.category.name}
                                </td>

                                <td className="px-5 py-4">
                                    Rp {Number(product.price).toLocaleString("id-ID")}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full ${
                                            product.stock <= 5
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {product.stock}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            product.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {product.is_active ? "Aktif" : "Nonaktif"}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <div className="flex justify-center gap-2">

                                        <Link
                                            href={route("products.edit", product.id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-lg"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            href={route("products.restock", product.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg"
                                        >
                                            Restock
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center gap-2 p-5">
                    {products.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`px-3 py-2 rounded border ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white"
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