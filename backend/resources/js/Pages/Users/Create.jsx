import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "cashier",
    });

    function submit(e) {
        e.preventDefault();
        post("/users");
    }

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Tambah User
            </h1>

            <form
                onSubmit={submit}
                className="bg-white rounded-xl shadow p-6 space-y-5 max-w-xl"
            >

                <div>
                    <label>Nama</label>

                    <input
                        className="w-full border rounded-lg p-2 mt-1"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />

                    <p className="text-red-500 text-sm">{errors.name}</p>
                </div>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        className="w-full border rounded-lg p-2 mt-1"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <p className="text-red-500 text-sm">{errors.email}</p>
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        className="w-full border rounded-lg p-2 mt-1"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <p className="text-red-500 text-sm">{errors.password}</p>
                </div>

                <div>
                    <label>Konfirmasi Password</label>

                    <input
                        type="password"
                        className="w-full border rounded-lg p-2 mt-1"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                    />
                </div>

                <div>
                    <label>Role</label>

                    <select
                        className="w-full border rounded-lg p-2 mt-1"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                    >
                        <option value="cashier">Cashier</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="flex gap-3">

                    <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        disabled={processing}
                    >
                        Simpan
                    </button>

                    <Link
                        href="/users"
                        className="px-5 py-2 rounded-lg border"
                    >
                        Batal
                    </Link>

                </div>

            </form>

        </AdminLayout>
    );
}