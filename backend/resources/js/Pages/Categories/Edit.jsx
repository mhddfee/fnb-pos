import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    FolderEdit,
    ArrowLeft,
    Save,
} from "lucide-react";

export default function Edit({ category }) {

    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description || "",
        is_active: category.is_active,
    });

    function submit(e) {
        e.preventDefault();

        put(`/categories/${category.id}`);
    }

    return (
        <AdminLayout>

            {/* Header */}

            <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                    <FolderEdit className="w-7 h-7" />
                </div>

                <div>

                    <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                        Categories
                    </p>

                    <h1 className="text-4xl font-bold">
                        Edit Kategori
                    </h1>

                    <p className="text-neutral-500 mt-1">
                        Perbarui informasi kategori yang dipilih.
                    </p>

                </div>

            </div>


            {/* Form */}

            <div className="max-w-3xl">

                <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden">

                    <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-50">

                        <h2 className="text-lg font-bold">
                            Informasi Kategori
                        </h2>

                        <p className="text-sm text-neutral-500 mt-1">
                            Ubah informasi kategori sesuai kebutuhan.
                        </p>

                    </div>


                    <form
                        onSubmit={submit}
                        className="p-6 space-y-6"
                    >

                        {/* Nama Kategori */}

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Nama Kategori
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full border border-neutral-200 rounded-2xl px-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.name}
                                </p>
                            )}

                        </div>


                        {/* Deskripsi */}

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Deskripsi
                            </label>

                            <textarea
                                rows="5"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full border border-neutral-200 rounded-2xl px-4 py-3 outline-none resize-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                            />

                            {errors.description && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.description}
                                </p>
                            )}

                        </div>


                        {/* Status */}

                        <div className="rounded-2xl border border-neutral-200 p-4">

                            <label className="flex items-center justify-between cursor-pointer">

                                <div>

                                    <p className="font-semibold">
                                        Status Kategori
                                    </p>

                                    <p className="text-sm text-neutral-500 mt-1">
                                        Aktifkan kategori agar dapat digunakan pada produk.
                                    </p>

                                </div>

                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData(
                                            "is_active",
                                            e.target.checked
                                        )
                                    }
                                    className="w-5 h-5 accent-black cursor-pointer"
                                />

                            </label>

                        </div>


                        {/* Tombol */}

                        <div className="flex items-center justify-between pt-2">

                            <Link
                                href="/categories"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 font-semibold text-sm hover:bg-neutral-100 transition"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Kembali
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition"
                            >
                                <Save className="w-4 h-4" />

                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}