import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Edit({ user }) {

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    function submit(e) {
        e.preventDefault();

        put(`/users/${user.id}`);
    }

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Edit User
            </h1>

            <form
                onSubmit={submit}
                className="bg-white rounded-xl shadow p-6 max-w-xl space-y-5"
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
                    <label>Role</label>

                    <select
                        className="w-full border rounded-lg p-2 mt-1"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                    >
                        <option value="admin">Admin</option>
                        <option value="cashier">Cashier</option>
                    </select>

                    <p className="text-red-500 text-sm">{errors.role}</p>
                </div>

                <div className="flex gap-3">

                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Simpan
                    </button>

                    <Link
                        href="/users"
                        className="border px-5 py-2 rounded-lg"
                    >
                        Batal
                    </Link>

                </div>

            </form>

        </AdminLayout>
    );
}