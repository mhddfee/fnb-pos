import {
    Package,
    Plus,
    Search,
    Pencil,
    RefreshCw,
    Trash2,
    PackageCheck,
    PackageX,
    TriangleAlert,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm, } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ products, filters, stats = {} }) {
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
            <div className="flex flex-col gap-5 mb-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                            <Package className="w-7 h-7" />
                        </div>

                        <div>

                            <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                                Products
                            </p>

                            <h1 className="text-4xl font-bold">
                                Daftar Produk
                            </h1>

                            <p className="text-neutral-500 mt-1">
                                Kelola produk, stok, harga, dan kategori.
                            </p>

                        </div>

                    </div>

                    <Link
                        href="/products/create"
                        className="inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white px-5 py-3 rounded-xl font-semibold transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Produk
                    </Link>

                </div>


                {/* Search */}

                <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row gap-3"
                >

                    <div className="relative flex-1">

                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                        <input
                            type="text"
                            value={data.search}
                            onChange={(e) =>
                                setData("search", e.target.value)
                            }
                            placeholder="Cari nama produk..."
                            className="w-full border border-neutral-200 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                        />

                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white px-5 py-3 rounded-2xl font-semibold transition"
                    >
                        <Search className="w-4 h-4" />
                        Cari
                    </button>

                </form>

            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

                {/* Total Produk */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Total Produk
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats?.total ?? 0}
                            </h2>

                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center">
                            <Package className="w-5 h-5 text-neutral-700" />
                        </div>

                    </div>

                </div>


                {/* Produk Aktif */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Produk Aktif
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats?.active ?? 0}
                            </h2>

                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center">
                            <PackageCheck className="w-5 h-5 text-emerald-600" />
                        </div>

                    </div>

                </div>


                {/* Produk Nonaktif */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Produk Nonaktif
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats?.inactive ?? 0}
                            </h2>

                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
                            <PackageX className="w-5 h-5 text-red-600" />
                        </div>

                    </div>

                </div>


                {/* Stok Menipis */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Stok Menipis
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats?.lowStock ?? 0}
                            </h2>

                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center">
                            <TriangleAlert className="w-5 h-5 text-amber-600" />
                        </div>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="min-w-[1100px] w-full">

                        <thead className="bg-neutral-50 border-b border-neutral-200">

                            <tr>

                                <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-neutral-500">
                                    No
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-neutral-500">
                                    Produk
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-neutral-500">
                                    Kategori
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-neutral-500">
                                    Harga
                                </th>

                                <th className="px-5 py-4 text-center text-xs uppercase tracking-wider text-neutral-500">
                                    Stok
                                </th>

                                <th className="px-5 py-4 text-center text-xs uppercase tracking-wider text-neutral-500">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-center text-xs uppercase tracking-wider text-neutral-500">
                                    Aksi
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-neutral-100">

                            {products.data.map((product, index) => (

                                <tr
                                    key={product.id}
                                    className="hover:bg-neutral-50 transition"
                                >

                                    {/* No */}

                                    <td className="px-5 py-4 text-sm text-neutral-500">
                                        {index + 1}
                                    </td>


                                    {/* Produk */}

                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-4">

                                            {product.image ? (

                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-14 h-14 object-cover rounded-2xl border border-neutral-200"
                                                />

                                            ) : (

                                                <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center">

                                                    <Package className="w-6 h-6 text-neutral-400" />

                                                </div>

                                            )}


                                            <div className="min-w-0">

                                                <p className="font-semibold text-neutral-900 truncate max-w-[220px]">
                                                    {product.name}
                                                </p>

                                                <p className="text-sm text-neutral-500 truncate max-w-[220px]">
                                                    {product.description || "Tidak ada deskripsi"}
                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/* Kategori */}

                                    <td className="px-5 py-4">

                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium">

                                            {product.category?.name || "-"}

                                        </span>

                                    </td>


                                    {/* Harga */}

                                    <td className="px-5 py-4">

                                        <p className="font-semibold text-neutral-900">

                                            Rp {Number(product.price).toLocaleString("id-ID")}

                                        </p>

                                    </td>


                                    {/* Stok */}

                                    <td className="px-5 py-4 text-center">

                                        <span
                                            className={`inline-flex items-center justify-center min-w-12 px-3 py-1 rounded-full text-sm font-semibold ${
                                                product.stock <= 5
                                                    ? "bg-red-50 text-red-600"
                                                    : product.stock <= 10
                                                    ? "bg-amber-50 text-amber-600"
                                                    : "bg-emerald-50 text-emerald-600"
                                            }`}
                                        >

                                            {product.stock}

                                        </span>

                                    </td>


                                    {/* Status */}

                                    <td className="px-5 py-4 text-center">

                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
                                                product.is_active
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-red-50 text-red-600"
                                            }`}
                                        >

                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    product.is_active
                                                        ? "bg-emerald-500"
                                                        : "bg-red-500"
                                                }`}
                                            />

                                            {product.is_active
                                                ? "Aktif"
                                                : "Nonaktif"}

                                        </span>

                                    </td>


                                    {/* Aksi */}

                                    <td className="px-5 py-4">

                                        <div className="flex items-center justify-center gap-2">

                                            <Link
                                                href={route(
                                                    "products.edit",
                                                    product.id
                                                )}
                                                title="Edit Produk"
                                                className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition"
                                            >

                                                <Pencil className="w-4 h-4" />

                                            </Link>


                                            <Link
                                                href={route(
                                                    "products.restock",
                                                    product.id
                                                )}
                                                title="Restock Produk"
                                                className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition"
                                            >

                                                <RefreshCw className="w-4 h-4" />

                                            </Link>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                                title="Hapus Produk"
                                                className="w-9 h-9 rounded-xl border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
                                            >

                                                <Trash2 className="w-4 h-4" />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {/* Pagination */}

                <div className="flex flex-wrap justify-center gap-2 p-5 border-t border-neutral-200">

                    {products.links.map((link, index) => (

                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() =>
                                link.url && router.visit(link.url)
                            }
                            className={`px-4 py-2 min-w-10 rounded-xl border text-sm font-medium transition ${
                                link.active
                                    ? "bg-black text-white border-black"
                                    : "bg-white border-neutral-200 hover:bg-neutral-100"
                            } ${
                                !link.url
                                    ? "opacity-40 cursor-not-allowed"
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