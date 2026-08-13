import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";
import {
    Truck,
    Search,
    Plus,
    Pencil,
    Trash2,
    Mail,
    Phone,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Index({ suppliers, filters }) {

    const { data, setData, get } = useForm({
        search: filters?.search || "",
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

            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                        <Truck className="w-7 h-7" />
                    </div>

                    <div>

                        <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                            Suppliers
                        </p>

                        <h1 className="text-4xl font-bold">
                            Daftar Supplier
                        </h1>

                        <p className="text-neutral-500 mt-1">
                            Kelola data supplier yang digunakan dalam operasional.
                        </p>

                    </div>

                </div>

                <Link
                    href="/suppliers/create"
                    className="inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Supplier
                </Link>

            </div>


            {/* Search */}

            <div className="bg-white border border-neutral-200 rounded-2xl p-4 mb-6">

                <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row gap-3"
                >

                    <div className="relative flex-1">

                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                        <input
                            type="text"
                            placeholder="Cari nama supplier..."
                            value={data.search}
                            onChange={(e) =>
                                setData("search", e.target.value)
                            }
                            className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                        />

                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        <Search className="w-4 h-4" />
                        Cari
                    </button>

                </form>

            </div>


            {/* Table */}

            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px]">

                        <thead className="bg-neutral-50 border-b border-neutral-200">

                            <tr>

                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500">
                                    No
                                </th>

                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500">
                                    Supplier
                                </th>

                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500">
                                    Kontak
                                </th>

                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-neutral-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-neutral-500">
                                    Aksi
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-neutral-100">

                            {suppliers.data.length > 0 ? (

                                suppliers.data.map((supplier, index) => (

                                    <tr
                                        key={supplier.id}
                                        className="hover:bg-neutral-50 transition"
                                    >

                                        <td className="px-6 py-5 text-sm text-neutral-500">
                                            {suppliers.from + index}
                                        </td>


                                        {/* Supplier */}

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                                                    <Truck className="w-5 h-5 text-neutral-600" />
                                                </div>

                                                <div>

                                                    <p className="font-semibold text-neutral-900">
                                                        {supplier.name}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Phone */}

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-2 text-sm text-neutral-600">

                                                <Phone className="w-4 h-4 text-neutral-400" />

                                                {supplier.phone || "-"}

                                            </div>

                                        </td>


                                        {/* Email */}

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-2 text-sm text-neutral-600">

                                                <Mail className="w-4 h-4 text-neutral-400" />

                                                {supplier.email || "-"}

                                            </div>

                                        </td>


                                        {/* Status */}

                                        <td className="px-6 py-5 text-center">

                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
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


                                        {/* Actions */}

                                        <td className="px-6 py-5">

                                            <div className="flex justify-center items-center gap-2">

                                                <Link
                                                    href={route(
                                                        "suppliers.edit",
                                                        supplier.id
                                                    )}
                                                    className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-2 rounded-lg text-sm font-semibold transition"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            supplier.id
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-semibold transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Hapus
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center"
                                    >

                                        <Truck className="w-10 h-10 mx-auto text-neutral-300 mb-3" />

                                        <p className="font-semibold text-neutral-700">
                                            Supplier tidak ditemukan
                                        </p>

                                        <p className="text-sm text-neutral-400 mt-1">
                                            Coba gunakan kata pencarian lain.
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* Pagination */}

                {suppliers.links.length > 3 && (

                    <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4">

                        <p className="text-sm text-neutral-500">

                            Menampilkan{" "}
                            <span className="font-semibold text-neutral-700">
                                {suppliers.from || 0}
                            </span>{" "}
                            sampai{" "}
                            <span className="font-semibold text-neutral-700">
                                {suppliers.to || 0}
                            </span>{" "}
                            dari{" "}
                            <span className="font-semibold text-neutral-700">
                                {suppliers.total}
                            </span>{" "}
                            supplier

                        </p>


                        <div className="flex items-center gap-1">

                            {suppliers.links.map((link, index) => {

                                const isPrevious =
                                    link.label.includes("Previous") ||
                                    link.label.includes("Sebelumnya");

                                const isNext =
                                    link.label.includes("Next") ||
                                    link.label.includes("Berikutnya");

                                return (

                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            router.visit(link.url, {
                                                preserveScroll: true,
                                            })
                                        }
                                        className={`min-w-9 h-9 px-3 rounded-lg border text-sm font-medium transition ${
                                            link.active
                                                ? "bg-black text-white border-black"
                                                : link.url
                                                ? "bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                                                : "bg-neutral-50 text-neutral-300 border-neutral-100 cursor-not-allowed"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: isPrevious
                                                ? "‹"
                                                : isNext
                                                ? "›"
                                                : link.label,
                                        }}
                                    />

                                );

                            })}

                        </div>

                    </div>

                )}

            </div>

        </AdminLayout>
    );
}