import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    UserRoundPen,
    UserRound,
    Mail,
    Lock,
    ShieldCheck,
    ArrowLeft,
    Save,
} from "lucide-react";

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        role: user.role || "cashier",
    });

    function submit(e) {
        e.preventDefault();

        put(`/users/${user.id}`);
    }

    return (
        <AdminLayout>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                    <UserRoundPen className="w-7 h-7" />
                </div>

                <div>
                    <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                        Users
                    </p>

                    <h1 className="text-4xl font-bold">
                        Edit User
                    </h1>

                    <p className="text-neutral-500 mt-1">
                        Perbarui informasi akun dan hak akses user.
                    </p>
                </div>

            </div>


            {/* Form */}
            <div className="max-w-3xl">

                <form
                    onSubmit={submit}
                    className="bg-white border border-neutral-200 rounded-3xl overflow-hidden"
                >

                    {/* Form Header */}
                    <div className="p-6 border-b border-neutral-200">

                        <h2 className="text-xl font-bold">
                            Informasi Akun
                        </h2>

                        <p className="text-sm text-neutral-500 mt-1">
                            Perubahan akan langsung diterapkan pada akun user.
                        </p>

                    </div>


                    <div className="p-6 space-y-6">

                        {/* Nama */}
                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Nama User
                            </label>

                            <div className="relative">

                                <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Masukkan nama user"
                                    className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                />

                            </div>

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.name}
                                </p>
                            )}

                        </div>


                        {/* Email */}
                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Email
                            </label>

                            <div className="relative">

                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="user@email.com"
                                    className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                />

                            </div>

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.email}
                                </p>
                            )}

                        </div>


                        {/* Password */}
                        <div>

                            <div className="mb-3">

                                <label className="block text-sm font-semibold">
                                    Ganti Password
                                </label>

                                <p className="text-xs text-neutral-500 mt-1">
                                    Kosongkan jika password tidak ingin diubah.
                                </p>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Password Baru
                                    </label>

                                    <div className="relative">

                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Password baru"
                                            className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                        />

                                    </div>

                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {errors.password}
                                        </p>
                                    )}

                                </div>


                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Konfirmasi Password
                                    </label>

                                    <div className="relative">

                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Ulangi password"
                                            className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Role */}
                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Role User
                            </label>

                            <div className="relative">

                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />

                                <select
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition bg-white"
                                >
                                    <option value="cashier">
                                        Cashier
                                    </option>

                                    <option value="admin">
                                        Admin
                                    </option>
                                </select>

                            </div>

                            <p className="text-xs text-neutral-500 mt-2">
                                Tentukan hak akses user berdasarkan kebutuhannya.
                            </p>

                        </div>

                    </div>


                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 p-6 bg-neutral-50 border-t border-neutral-200">

                        <Link
                            href="/users"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 font-semibold transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>


                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl font-semibold transition"
                        >

                            <Save className="w-4 h-4" />

                            {processing
                                ? "Menyimpan..."
                                : "Simpan Perubahan"}

                        </button>

                    </div>

                </form>

            </div>

        </AdminLayout>
    );
}