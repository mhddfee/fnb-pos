import {
    Folder,
    Plus,
    Search,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    FolderOpen,
    FolderCheck,
    FolderX,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";

export default function Index({ categories, filters, stats = {} }) {

    const { data, setData, get } = useForm({
    search: filters.search || "",
    });

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus kategori ini?")) {
            router.delete(`/categories/${id}`);
        }
    }

    function handleSearch(e) {
        e.preventDefault();

        get("/categories", {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <AdminLayout>
            <div className="flex flex-col gap-3 mb-8">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                            <Folder className="w-7 h-7" />
                        </div>

                        <div>

                            <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                                Categories
                            </p>

                            <h1 className="text-4xl font-bold">
                                Daftar Kategori
                            </h1>

                        </div>

                    </div>

                    <Link
                        href="/categories/create"
                        className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Kategori
                    </Link>

                </div>

                <p className="text-neutral-500">
                    Kelola kategori produk yang tersedia di sistem.
                </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

                {/* Total */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Total Kategori
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats?.total ?? 0}
                            </h2>

                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center">
                            <FolderOpen className="w-5 h-5 text-neutral-700" />
                        </div>

                    </div>

                </div>


                {/* Aktif */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Kategori Aktif
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats?.active ?? 0}
                            </h2>

                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center">
                            <FolderCheck className="w-5 h-5 text-emerald-600" />
                        </div>

                    </div>

                </div>


                {/* Nonaktif */}

                <div className="bg-white rounded-3xl border border-neutral-200 p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-neutral-500">
                                Kategori Nonaktif
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats?.inactive ?? 0}
                            </h2>

                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
                            <FolderX className="w-5 h-5 text-red-600" />
                        </div>

                    </div>

                </div>

            </div>

            <form
                onSubmit={handleSearch}
                className="mb-6"
            >
                <div className="relative max-w-xl">

                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                    <input
                        type="text"
                        placeholder="Cari kategori..."
                        value={data.search}
                        onChange={(e) =>
                            setData("search", e.target.value)
                        }
                        className="w-full border border-neutral-200 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-black/10 focus:border-neutral-400 transition"
                    />

                </div>
            </form>

            <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-[1000px] w-full border-collapse">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">No</th>
                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Nama</th>
                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">Deskripsi</th>
                                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-semibold">Status</th>
                                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-semibold">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.data.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-16 text-center"
                                    >

                                        <div className="flex flex-col items-center">

                                            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                                                <Folder className="w-8 h-8 text-neutral-400" />
                                            </div>

                                            <h3 className="text-lg font-bold">
                                                Kategori tidak ditemukan
                                            </h3>

                                            <p className="text-sm text-neutral-500 mt-2">
                                                Coba gunakan kata kunci lain atau tambahkan kategori baru.
                                            </p>

                                            <Link
                                                href="/categories/create"
                                                className="inline-flex items-center gap-2 mt-5 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-neutral-800 transition"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Tambah Kategori
                                            </Link>

                                        </div>

                                    </td>
                                </tr>

                            ) : (

                                categories.data.map((category, index) => (

                                    <tr
                                        key={category.id}
                                        className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition"
                                    >

                                        <td className="px-6 py-4 text-neutral-500">
                                            {index + 1}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="font-semibold">
                                                {category.name}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-neutral-600">
                                            {category.description || "-"}
                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                    category.is_active
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {category.is_active
                                                    ? "Aktif"
                                                    : "Nonaktif"}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-center items-center gap-2">

                                                <Link
                                                    href={`/categories/${category.id}/edit`}
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 text-sm font-semibold hover:bg-neutral-100 transition"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(category.id)}
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Hapus
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}
                        </tbody>
                    </table>
                </div>    
                <div className="flex items-center justify-between px-6 py-5 border-t border-neutral-200">

                    <p className="text-sm text-neutral-500">
                        Menampilkan{" "}
                        <span className="font-semibold text-neutral-700">
                            {categories.from ?? 0}
                        </span>
                        {" "}sampai{" "}
                        <span className="font-semibold text-neutral-700">
                            {categories.to ?? 0}
                        </span>
                        {" "}dari{" "}
                        <span className="font-semibold text-neutral-700">
                            {categories.total ?? 0}
                        </span>
                        {" "}kategori
                    </p>

                    <div className="flex items-center gap-2">

                        {categories.links.map((link, index) => {

                            const isPrevious = index === 0;
                            const isNext = index === categories.links.length - 1;

                            return (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (link.url) {
                                            router.visit(link.url, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            });
                                        }
                                    }}
                                    className={`
                                        w-9 h-9 rounded-xl
                                        flex items-center justify-center
                                        text-sm font-semibold
                                        border transition
                                        ${
                                            link.active
                                                ? "bg-black text-white border-black"
                                                : link.url
                                                    ? "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                                                    : "bg-neutral-100 text-neutral-300 border-neutral-100 cursor-not-allowed"
                                        }
                                    `}
                                >

                                    {isPrevious ? (
                                        <ChevronLeft className="w-4 h-4" />
                                    ) : isNext ? (
                                        <ChevronRight className="w-4 h-4" />
                                    ) : (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    )}

                                </button>
                            );
                        })}

                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}