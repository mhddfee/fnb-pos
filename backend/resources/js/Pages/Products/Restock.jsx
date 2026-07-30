import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";

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
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">
                    Restock Produk
                </h1>

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="mb-5">
                        <p className="text-gray-500">Produk</p>
                        <h2 className="text-2xl font-bold">
                            {product.name}
                        </h2>
                    </div>

                    <div className="mb-5">
                        <p className="text-gray-500">Stok Saat Ini</p>
                        <h2 className="text-3xl font-bold text-blue-600">
                            {product.stock}
                        </h2>
                    </div>

                    <form onSubmit={submit}>

                        <label className="block mb-2 font-medium">
                            Tambah Stok
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={data.stock}
                            onChange={(e) =>
                                setData("stock", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        {errors.stock && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.stock}
                            </p>
                        )}

                        <div className="flex justify-end gap-3 mt-6">

                            <Link
                                href={route("products.index")}
                                className="px-5 py-2 bg-gray-500 text-white rounded-lg"
                            >
                                Batal
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                            >
                                Simpan Restock
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </AdminLayout>
    );
}