import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        is_active: true,
    });

    function submit(e) {
        e.preventDefault();

        post("/categories");
    }

    return (
        <AdminLayout>
            <div className="max-w-2xl bg-white rounded-xl shadow p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Tambah Kategori
                </h1>

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label className="block mb-2 font-medium">
                            Nama Kategori
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
                            Deskripsi
                        </label>

                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
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

                        <span>Aktif</span>
                    </div>

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Simpan
                        </button>

                        <Link
                            href="/categories"
                            className="bg-gray-300 px-5 py-2 rounded-lg"
                        >
                            Batal
                        </Link>

                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}