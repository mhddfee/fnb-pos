export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-6">
                <h1 className="text-2xl font-bold mb-8">
                    🏪 KALIMA
                </h1>

                <nav className="space-y-3">
                    <a href="#" className="block hover:text-blue-400">
                        Dashboard
                    </a>

                    <a href="#" className="block hover:text-blue-400">
                        Kategori
                    </a>

                    <a href="#" className="block hover:text-blue-400">
                        Produk
                    </a>

                    <a href="#" className="block hover:text-blue-400">
                        Supplier
                    </a>

                    <a href="#" className="block hover:text-blue-400">
                        Kasir
                    </a>

                    <a href="#" className="block hover:text-blue-400">
                        Laporan
                    </a>
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}