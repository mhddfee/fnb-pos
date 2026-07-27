import { Link, usePage } from "@inertiajs/react";

export default function AdminLayout({ children }) {
    const { url } = usePage();

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-6">
                <h1 className="text-2xl font-bold mb-8">
                    🏪 KALIMA
                </h1>

                <nav className="space-y-3">
                    <Link
                        href="/dashboard"
                        className={`block px-3 py-2 rounded-lg ${
                            url.startsWith("/dashboard")
                                ? "bg-blue-600 text-white"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/categories"
                        className={`block px-3 py-2 rounded-lg ${
                            url.startsWith("/categories")
                                ? "bg-blue-600 text-white"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Kategori
                    </Link>

                    <Link
                        href="/products"
                        className={`block px-3 py-2 rounded-lg ${
                            url.startsWith("/products")
                                ? "bg-blue-600 text-white"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Produk
                    </Link>

                    <Link
                        href="/suppliers"
                        className={`block px-3 py-2 rounded-lg ${
                            url.startsWith("/suppliers")
                                ? "bg-blue-600 text-white"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Supplier
                    </Link>

                    <Link
                        href="/cashier"
                        className={`block px-3 py-2 rounded-lg ${
                            url.startsWith("/cashier")
                                ? "bg-blue-600 text-white"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Kasir
                    </Link>

                    <Link
                        href="/#"
                        className={`block px-3 py-2 rounded-lg ${
                            url.startsWith("/#")
                                ? "bg-blue-600 text-white"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Laporan
                    </Link>

                    <Link
                        href="/transactions"
                        className={`block px-3 py-2 rounded-lg ${
                            url.startsWith("/transactions")
                                ? "bg-blue-600 text-white"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Transaksi
                    </Link>
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}