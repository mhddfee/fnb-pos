import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        is_active: true,
    });

    function submit(e) {
        e.preventDefault();

        post("/suppliers");
    }

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">
                Tambah Supplier
            </h1>

            <form
                onSubmit={submit}
                className="bg-white rounded-xl shadow p-6 space-y-5"
            >
                <div>
                    <label className="block mb-2 font-medium">
                        Nama Supplier
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
                        Nomor Telepon
                    </label>

                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Alamat
                    </label>

                    <textarea
                        rows="4"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.address}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) =>
                            setData("is_active", e.target.checked)
                        }
                    />

                    <label>Supplier Aktif</label>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                        Simpan Supplier
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}