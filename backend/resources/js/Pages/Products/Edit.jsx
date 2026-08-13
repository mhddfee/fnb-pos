import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Package,
    ArrowLeft,
    Save,
    Upload,
} from "lucide-react";

export default function Edit({ product, categories }) {

    const { data, setData, post, processing, errors } = useForm({
        _method: "put",
        category_id: product.category_id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
        image: null,
        is_active: product.is_active,
    });

    function submit(e) {
        e.preventDefault();

        post(`/products/${product.id}`, {
            forceFormData: true,
        });
    }

    return (
        <AdminLayout>

            {/* Header */}

            <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                    <Package className="w-7 h-7" />
                </div>

                <div>

                    <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                        Products
                    </p>

                    <h1 className="text-4xl font-bold">
                        Edit Produk
                    </h1>

                    <p className="text-neutral-500 mt-1">
                        Perbarui informasi produk yang sudah tersedia.
                    </p>

                </div>

            </div>


            {/* Form */}

            <div className="max-w-4xl">

                <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden">

                    {/* Form Header */}

                    <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-50">

                        <h2 className="text-lg font-bold">
                            Informasi Produk
                        </h2>

                        <p className="text-sm text-neutral-500 mt-1">
                            Ubah data produk sesuai kebutuhan.
                        </p>

                    </div>


                    <form
                        onSubmit={submit}
                        className="p-6 space-y-6"
                    >

                        {/* Kategori & Nama */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Kategori */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Kategori
                                </label>

                                <select
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData(
                                            "category_id",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border border-neutral-200 rounded-2xl px-4 py-3 bg-white outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                >

                                    <option value="">
                                        Pilih Kategori
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}

                                </select>

                                {errors.category_id && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.category_id}
                                    </p>
                                )}

                            </div>


                            {/* Nama */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Nama Produk
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Nama produk"
                                    className="w-full border border-neutral-200 rounded-2xl px-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                />

                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.name}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* Harga & Stok */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Harga */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Harga
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-medium">
                                        Rp
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData(
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-neutral-200 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                    />

                                </div>

                                {errors.price && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.price}
                                    </p>
                                )}

                            </div>


                            {/* Stok */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Stok
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData(
                                            "stock",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border border-neutral-200 rounded-2xl px-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                />

                                {errors.stock && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.stock}
                                    </p>
                                )}

                            </div>

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
                                    setData(
                                        "description",
                                        e.target.value
                                    )
                                }
                                placeholder="Deskripsi produk..."
                                className="w-full border border-neutral-200 rounded-2xl px-4 py-3 outline-none resize-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                            />

                            {errors.description && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.description}
                                </p>
                            )}

                        </div>


                        {/* Gambar */}

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Gambar Produk
                            </label>


                            {/* Gambar lama */}

                            {product.image && (
                                <div className="mb-4">

                                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
                                        Gambar Saat Ini
                                    </p>

                                    <div className="inline-block rounded-2xl overflow-hidden border border-neutral-200">

                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-32 h-32 object-cover"
                                        />

                                    </div>

                                </div>
                            )}


                            {/* Upload gambar baru */}

                            <label className="flex flex-col items-center justify-center gap-2 w-full min-h-32 border-2 border-dashed border-neutral-200 rounded-2xl cursor-pointer hover:bg-neutral-50 hover:border-neutral-300 transition">

                                <Upload className="w-7 h-7 text-neutral-400" />

                                <div className="text-center">

                                    <p className="text-sm font-semibold">
                                        Pilih gambar baru
                                    </p>

                                    <p className="text-xs text-neutral-400 mt-1">
                                        Kosongkan jika tidak ingin mengganti gambar
                                    </p>

                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            "image",
                                            e.target.files[0]
                                        )
                                    }
                                    className="hidden"
                                />

                            </label>

                            {data.image && (
                                <p className="text-sm text-neutral-500 mt-2">
                                    File baru: {data.image.name}
                                </p>
                            )}

                            {errors.image && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.image}
                                </p>
                            )}

                        </div>


                        {/* Status */}

                        <div className="rounded-2xl border border-neutral-200 p-4">

                            <label className="flex items-center justify-between cursor-pointer">

                                <div>

                                    <p className="font-semibold">
                                        Status Produk
                                    </p>

                                    <p className="text-sm text-neutral-500 mt-1">
                                        Produk aktif akan tersedia di kasir.
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


                        {/* Buttons */}

                        <div className="flex items-center justify-between pt-2">

                            <Link
                                href="/products"
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