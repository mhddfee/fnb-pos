import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

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
            <h1 className="text-3xl font-bold mb-6">
                Edit Kategori
            </h1>

            <form
                onSubmit={submit}
                className="bg-white p-6 rounded-lg shadow space-y-4"
            >
                <div>
                    <label className="block mb-1">Nama</label>

                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) =>
                            setData("name", e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Deskripsi</label>

                    <textarea
                        value={data.description}
                        onChange={(e) =>
                            setData("description", e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2"
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

                    <label>Aktif</label>
                </div>

                <button
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Simpan Perubahan
                </button>
            </form>
        </AdminLayout>
    );
}