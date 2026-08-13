import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import {
    PackagePlus,
    ArrowLeft,
    Plus,
} from "lucide-react";

export default function Restock({ product }) {

    const { data, setData, put, processing, errors } = useForm({
        stock: "",
    });

    function submit(e) {
        e.preventDefault();

        put(route("products.updateStock", product.id));
    }

    return (
        <AdminLayout>

            {/* Header */}

            <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                    <PackagePlus className="w-7 h-7" />
                </div>

                <div>

                    <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                        Products
                    </p>

                    <h1 className="text-4xl font-bold">
                        Restock Produk
                    </h1>

                    <p className="text-neutral-500 mt-1">
                        Tambahkan stok produk yang tersedia.
                    </p>

                </div>

            </div>


            {/* Content */}

            <div className="max-w-2xl">

                <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden">

                    {/* Product Info */}

                    <div className="p-6 border-b border-neutral-200">

                        <div className="flex items-center gap-4">

                            {/* Product Image */}

                            {product.image ? (

                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded-2xl border border-neutral-200"
                                />

                            ) : (

                                <div className="w-20 h-20 rounded-2xl bg-neutral-100 flex items-center justify-center">

                                    <PackagePlus className="w-8 h-8 text-neutral-400" />

                                </div>

                            )}


                            <div>

                                <p className="text-xs uppercase tracking-widest text-neutral-400">
                                    Produk
                                </p>

                                <h2 className="text-2xl font-bold mt-1">
                                    {product.name}
                                </h2>

                            </div>

                        </div>

                    </div>


                    {/* Current Stock */}

                    <div className="p-6">

                        <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-5">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-neutral-500">
                                        Stok Saat Ini
                                    </p>

                                    <p className="text-4xl font-bold mt-1">
                                        {product.stock}
                                    </p>

                                    <p className="text-sm text-neutral-400 mt-1">
                                        unit tersedia
                                    </p>

                                </div>

                                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                                    <PackagePlus className="w-6 h-6" />
                                </div>

                            </div>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={submit}
                            className="mt-6"
                        >

                            <label className="block text-sm font-semibold mb-2">
                                Tambah Stok
                            </label>

                            <div className="relative">

                                <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                                <input
                                    type="number"
                                    min="1"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData(
                                            "stock",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Contoh: 10"
                                    className="w-full border border-neutral-200 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                />

                            </div>

                            {errors.stock && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.stock}
                                </p>
                            )}


                            {/* Preview */}

                            {data.stock && Number(data.stock) > 0 && (

                                <div className="mt-4 rounded-2xl bg-neutral-50 border border-neutral-200 p-4">

                                    <div className="flex justify-between text-sm">

                                        <span className="text-neutral-500">
                                            Stok setelah restock
                                        </span>

                                        <span className="font-bold">
                                            {Number(product.stock) +
                                                Number(data.stock)}{" "}
                                            unit
                                        </span>

                                    </div>

                                </div>

                            )}


                            {/* Buttons */}

                            <div className="flex items-center justify-between gap-3 mt-6">

                                <Link
                                    href={route("products.index")}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 font-semibold text-sm hover:bg-neutral-100 transition"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Kembali
                                </Link>


                                <button
                                    type="submit"
                                    disabled={
                                        processing ||
                                        !data.stock ||
                                        Number(data.stock) < 1
                                    }
                                    className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition"
                                >

                                    <PackagePlus className="w-4 h-4" />

                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Restock"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}