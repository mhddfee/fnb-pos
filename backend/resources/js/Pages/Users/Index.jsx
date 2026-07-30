import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

export default function Index({ users }) {
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Manajemen User
                </h1>

                <Link
                    href="/users/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Tambah User
                </Link>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-5 py-3 text-left">Nama</th>
                            <th className="px-5 py-3 text-left">Email</th>
                            <th className="px-5 py-3 text-center">Role</th>
                            <th className="px-5 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.data.map((user) => (

                            <tr
                                key={user.id}
                                className="border-t"
                            >
                                <td className="px-5 py-4">
                                    {user.name}
                                </td>

                                <td className="px-5 py-4">
                                    {user.email}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            user.role === "admin"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-center">

                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => {
                                            if (confirm("Yakin ingin menghapus user ini?")) {
                                                router.delete(`/users/${user.id}`);
                                            }
                                        }}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Hapus
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </AdminLayout>
    );
}