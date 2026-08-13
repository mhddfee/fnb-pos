import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Truck,
    UserRound,
    Phone,
    Mail,
    MapPin,
    ArrowLeft,
    Save,
} from "lucide-react";

export default function Edit({ supplier }) {

    const { data, setData, put, processing, errors } = useForm({
        name: supplier.name,
        phone: supplier.phone || "",
        email: supplier.email || "",
        address: supplier.address || "",
        is_active: supplier.is_active,
    });

    function submit(e) {
        e.preventDefault();

        put(`/suppliers/${supplier.id}`);
    }

    return (
        <AdminLayout>

            {/* Header */}

            <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                    <Truck className="w-7 h-7" />
                </div>

                <div>

                    <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
                        Suppliers
                    </p>

                    <h1 className="text-4xl font-bold">
                        Edit Supplier
                    </h1>

                    <p className="text-neutral-500 mt-1">
                        Perbarui informasi supplier.
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
                            Informasi Supplier
                        </h2>

                        <p className="text-sm text-neutral-500 mt-1">
                            Periksa kembali data sebelum menyimpan perubahan.
                        </p>

                    </div>


                    <div className="p-6 space-y-6">

                        {/* Nama */}

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Nama Supplier
                            </label>

                            <div className="relative">

                                <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Nama supplier"
                                    className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                />

                            </div>

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.name}
                                </p>
                            )}

                        </div>


                        {/* Phone & Email */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Nomor Telepon
                                </label>

                                <div className="relative">

                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                    />

                                </div>

                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.phone}
                                    </p>
                                )}

                            </div>


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
                                            setData(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="supplier@email.com"
                                        className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition"
                                    />

                                </div>

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.email}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* Alamat */}

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Alamat
                            </label>

                            <div className="relative">

                                <MapPin className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />

                                <textarea
                                    rows="4"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData(
                                            "address",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Masukkan alamat supplier..."
                                    className="w-full border border-neutral-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-black/5 transition resize-none"
                                />

                            </div>

                            {errors.address && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.address}
                                </p>
                            )}

                        </div>


                        {/* Status */}

                        <div className="rounded-2xl border border-neutral-200 p-4">

                            <label className="flex items-center gap-3 cursor-pointer">

                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData(
                                            "is_active",
                                            e.target.checked
                                        )
                                    }
                                    className="w-5 h-5 rounded border-neutral-300"
                                />

                                <div>

                                    <p className="font-semibold">
                                        Supplier Aktif
                                    </p>

                                    <p className="text-sm text-neutral-500">
                                        Supplier dapat digunakan dalam sistem.
                                    </p>

                                </div>

                            </label>

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 p-6 bg-neutral-50 border-t border-neutral-200">

                        <Link
                            href="/suppliers"
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