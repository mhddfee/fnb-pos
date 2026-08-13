import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import {
    Users,
    UserPlus,
    Pencil,
    Trash2,
    ShieldCheck,
    UserRound,
    Mail,
} from "lucide-react";

export default function Index({ users }) {

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus user ini?")) {
            router.delete(`/users/${id}`);
        }
    }

    return (
        <AdminLayout>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                        <Users className="w-7 h-7" />
                    </div>

                    <div>
                        <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                            Management
                        </p>

                        <h1 className="text-4xl font-bold">
                            Manajemen User
                        </h1>

                        <p className="text-neutral-500 mt-1">
                            Kelola akun admin dan kasir.
                        </p>
                    </div>

                </div>


                <Link
                    href="/users/create"
                    className="inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                    <UserPlus className="w-5 h-5" />
                    Tambah User
                </Link>

            </div>


            {/* User Count */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                <div className="bg-white border border-neutral-200 rounded-2xl p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-neutral-500">
                                Total User
                            </p>

                            <p className="text-3xl font-bold mt-1">
                                {users.total}
                            </p>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center">
                            <Users className="w-5 h-5" />
                        </div>

                    </div>

                </div>


                <div className="bg-white border border-neutral-200 rounded-2xl p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-neutral-500">
                                Admin
                            </p>

                            <p className="text-3xl font-bold mt-1">
                                {
                                    users.data.filter(
                                        (user) => user.role === "admin"
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                        </div>

                    </div>

                </div>


                <div className="bg-white border border-neutral-200 rounded-2xl p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-neutral-500">
                                Cashier
                            </p>

                            <p className="text-3xl font-bold mt-1">
                                {
                                    users.data.filter(
                                        (user) => user.role === "cashier"
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                            <UserRound className="w-5 h-5" />
                        </div>

                    </div>

                </div>

            </div>


            {/* Table */}
            <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden">

                <div className="px-6 py-5 border-b border-neutral-200">

                    <h2 className="text-xl font-bold">
                        Daftar User
                    </h2>

                    <p className="text-sm text-neutral-500 mt-1">
                        Semua akun yang terdaftar di sistem.
                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full min-w-[800px]">

                        <thead className="bg-neutral-50">

                            <tr>

                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                    Aksi
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.data.length > 0 ? (

                                users.data.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-t border-neutral-100 hover:bg-neutral-50 transition"
                                    >

                                        {/* User */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-neutral-700">
                                                    {user.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>

                                                <div>

                                                    <p className="font-semibold">
                                                        {user.name}
                                                    </p>

                                                    <p className="text-xs text-neutral-500">
                                                        User #{user.id}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Email */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-2 text-neutral-600">

                                                <Mail className="w-4 h-4 text-neutral-400" />

                                                <span>
                                                    {user.email}
                                                </span>

                                            </div>

                                        </td>


                                        {/* Role */}
                                        <td className="px-6 py-5 text-center">

                                            <span
                                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                                                    user.role === "admin"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                            >

                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        user.role === "admin"
                                                            ? "bg-blue-600"
                                                            : "bg-green-600"
                                                    }`}
                                                />

                                                {user.role === "admin"
                                                    ? "Admin"
                                                    : "Cashier"}

                                            </span>

                                        </td>


                                        {/* Actions */}
                                        <td className="px-6 py-5">

                                            <div className="flex justify-end gap-2">

                                                <Link
                                                    href={`/users/${user.id}/edit`}
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-sm transition"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    Edit
                                                </Link>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Hapus
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="px-6 py-16 text-center"
                                    >

                                        <div className="flex flex-col items-center">

                                            <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                                                <Users className="w-7 h-7 text-neutral-400" />
                                            </div>

                                            <p className="font-semibold text-lg">
                                                Belum ada user
                                            </p>

                                            <p className="text-sm text-neutral-500 mt-1">
                                                Tambahkan user baru untuk mulai menggunakan sistem.
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* Pagination */}
                {users.links && users.links.length > 3 && (

                    <div className="flex flex-wrap justify-center gap-2 p-5 border-t border-neutral-200">

                        {users.links.map((link, index) => (

                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() =>
                                    link.url && router.visit(link.url)
                                }
                                className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${
                                    link.active
                                        ? "bg-black text-white border-black"
                                        : "bg-white hover:bg-neutral-100 border-neutral-200"
                                } ${
                                    !link.url
                                        ? "opacity-40 cursor-not-allowed"
                                        : ""
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />

                        ))}

                    </div>

                )}

            </div>

        </AdminLayout>
    );
}