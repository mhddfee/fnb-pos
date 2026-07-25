import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

export default function Edit({ product, categories }) {

    const { data, setData, put, processing, errors } = useForm({
        category_id: product.category_id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        is_active: product.is_active,
    });

    function submit(e) {
        e.preventDefault();

        put(`/products/${product.id}`);
    }

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">
                Edit Produk
            </h1>

            <form
                onSubmit={submit}
                className="bg-white rounded-xl shadow p-6 space-y-5"
            >
                <div>
                    <label className="block mb-2 font-medium">
                        Kategori
                    </label>

                    <select
                        value={data.category_id}
                        onChange={(e) =>
                            setData("category_id", e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="">Pilih Kategori</option>

                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {errors.category_id && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.category_id}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-2 font-medium">
                        Nama Produk
                    </label>

                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-2 font-medium">
                        Harga
                    </label>

                    <input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.price}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-2 font-medium">
                        Deskripsi
                    </label>

                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        rows="4"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) =>
                            setData("is_active", e.target.checked)
                        }
                    />

                    <label>Produk Aktif</label>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                        Update Produk
                    </button>
                </div>       
            </form>
        </AdminLayout>
    );
}