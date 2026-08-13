import { router, usePage } from "@inertiajs/react";
import {
    Search,
    Coffee,
    LayoutGrid,
    ShoppingCart,
    CreditCard,
    Banknote,
    QrCode,
} from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({ products, categories }) {
    const [cart, setCart] = useState([]);
    const [paid, setPaid] = useState("");
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [paymentMethod, setPaymentMethod] = useState("cash");

    console.log(usePage().props);

    function addToCart(product) {
        const existing = cart.find(item => item.id === product.id);

        if (existing && existing.qty >= product.stock) {
            alert("Stok produk tidak mencukupi.");
            return;
        }

        if (existing) {
            setCart(
                cart.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            qty: item.qty + 1,
                            subtotal: (item.qty + 1) * item.price,
                        }
                        : item
                )
            );
        } else {
            setCart([
                ...cart,
                {
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    stock: product.stock,
                    qty: 1,
                    subtotal: Number(product.price),
                },
            ]);
        }
    }

    function increaseQty(id) {

        setCart(
            cart.map(item => {

                if (item.id !== id) return item;

                if (item.qty >= item.stock) {
                    return item;
                }

                return {
                    ...item,
                    qty: item.qty + 1,
                    subtotal: (item.qty + 1) * item.price,
                };

            })
        );

    }

    function decreaseQty(id) {
        setCart(
            cart
                .map(item =>
                    item.id === id
                        ? {
                            ...item,
                            qty: item.qty - 1,
                            subtotal: (item.qty - 1) * item.price,
                        }
                        : item
                )
                .filter(item => item.qty > 0)
        );
    }

    const total = cart.reduce(
        (sum, item) => sum + item.subtotal,
        0
    );

    const change = Math.max(Number(paid || 0) - total, 0);

    const isDisabled =
    cart.length === 0 ||
    (
        paymentMethod === "cash" &&
        Number(paid) < total
    );

    function saveTransaction() {
        router.post("/cashier", {
            cart,
            total,
            paid: Number(paid),
            payment_method: paymentMethod,
        });
    }

    const filteredProducts = products.filter(product => {

        const matchSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchCategory =
            selectedCategory === "all" ||
            product.category_id === selectedCategory;

        return matchSearch && matchCategory;

    });
    return (
        <AdminLayout>
            <div className="space-y-8">

                <div>

                    <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                        Point Of Sale
                    </p>

                    <h1 className="text-4xl font-bold text-neutral-900 mt-2">
                        Kasir
                    </h1>

                    <p className="text-neutral-500 mt-3">
                        Kelola transaksi penjualan dengan cepat dan mudah.
                    </p>

                </div>
                
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Daftar Produk */}
                    <div className="lg:col-span-2">

                        <div className="bg-white rounded-3xl border border-neutral-200 p-6 mb-6">

                            <div className="relative">

                                <Search
                                    className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e)=>setSearch(e.target.value)}
                                    placeholder="Cari produk..."
                                    className="w-full rounded-2xl border border-neutral-200 py-3 pl-12 pr-4 outline-none focus:border-black"
                                />

                            </div>

                            <div className="flex flex-wrap gap-3 mt-5">

                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`px-5 py-2 rounded-full transition ${
                                        selectedCategory === "all"
                                            ? "bg-black text-white"
                                            : "border border-neutral-200 hover:bg-neutral-100"
                                    }`}
                                >
                                    Semua
                                </button>

                                {categories.map(category => (

                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-5 py-2 rounded-full transition ${
                                            selectedCategory === category.id
                                                ? "bg-black text-white"
                                                : "border border-neutral-200 hover:bg-neutral-100"
                                        }`}
                                    >
                                        {category.name}
                                    </button>

                                ))}

                            </div>

                        </div>

                        <div className="flex items-center justify-between mb-5">

                            <div>

                                <h2 className="text-2xl font-bold">
                                    Daftar Produk
                                </h2>

                                <p className="text-sm text-neutral-500 mt-1">
                                    Menampilkan {filteredProducts.length} produk
                                </p>

                            </div>

                        </div>

                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

                            {filteredProducts.length === 0 ? (

                                <div className="col-span-full py-20 text-center">

                                    <div className="text-6xl mb-4">
                                        🔍
                                    </div>

                                    <h3 className="text-2xl font-bold text-neutral-800">
                                        Produk tidak ditemukan
                                    </h3>

                                    <p className="text-neutral-500 mt-2">
                                        Coba gunakan kata kunci lain atau pilih kategori berbeda.
                                    </p>

                                </div>

                            ) : (

                                filteredProducts.map(product => (

                                    <div
                                        key={product.id}
                                        className="group overflow-hidden bg-white rounded-3xl border border-neutral-200 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        {/* Image */}
                                        <div className="relative mb-5">

                                            {product.stock <= 5 && product.stock > 0 && (
                                                <div className="absolute top-3 left-3 z-10">
                                                    <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                                                        ⚠ Stok Sedikit
                                                    </span>
                                                </div>
                                            )}

                                            {product.stock <= 0 && (
                                                <div className="absolute top-3 left-3 z-10">
                                                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                                                        Sold Out
                                                    </span>
                                                </div>
                                            )}

                                            {product.image ? (
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-full h-44 object-cover rounded-2xl transition duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-44 rounded-2xl bg-neutral-100 flex items-center justify-center">
                                                    <Coffee className="w-12 h-12 text-neutral-400" />
                                                </div>
                                            )}

                                        </div>

                                        {/* Nama */}
                                        <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>

                                        {/* Kategori */}
                                        <p className="text-sm text-neutral-500 mt-1">
                                            {product.category.name}
                                        </p>

                                        {/* Harga */}
                                        <div className="mt-5">
                                            <p className="text-xs uppercase tracking-widest text-neutral-400">
                                                Harga
                                            </p>

                                            <h2 className="text-3xl font-bold mt-1">
                                                Rp {Number(product.price).toLocaleString("id-ID")}
                                            </h2>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-6 flex items-center justify-between">

                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                                    product.stock <= 5
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                            >
                                                Stok {product.stock}
                                            </span>

                                            <button
                                                disabled={product.stock <= 0}
                                                onClick={() => addToCart(product)}
                                                className={`rounded-xl px-4 py-2 font-semibold transition ${
                                                    product.stock <= 0
                                                        ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                                        : "bg-black text-white hover:bg-neutral-800"
                                                }`}
                                            >
                                                Tambah
                                            </button>

                                        </div>

                                    </div>

                                ))

                            )}

                        </div>

                    </div>

                    {/* Keranjang */}
                    <div className="bg-white rounded-3xl border border-neutral-200 p-6 sticky top-6 h-fit">

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-bold">
                                    Cart
                                </h2>

                                <p className="text-neutral-500 text-sm">
                                    {cart.length} Item
                                </p>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center">

                                <ShoppingCart className="w-6 h-6 text-neutral-700" />

                            </div>

                        </div>

                        {cart.length === 0 ? (
                            <div className="text-center py-14">

                                <div className="text-6xl">
                                    🛒
                                </div>

                                <h3 className="font-bold text-xl mt-5">
                                    Keranjang kosong
                                </h3>

                                <p className="text-neutral-500 mt-2">
                                    Pilih produk dari sebelah kiri
                                </p>

                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 max-h-[420px] overflow-y-auto">

                                    {cart.map(item => (

                                        <div
                                            key={item.id}
                                            className="rounded-2xl border border-neutral-200 p-5"
                                        >

                                            <div className="flex justify-between items-start">

                                                <div>

                                                    <h3 className="font-bold">
                                                        {item.name}
                                                    </h3>

                                                    <p className="text-gray-500 text-sm">
                                                        Rp {item.price.toLocaleString("id-ID")}
                                                    </p>

                                                </div>

                                                <p className="text-lg font-bold">
                                                    Rp {item.subtotal.toLocaleString("id-ID")}
                                                </p>

                                            </div>

                                            <div className="flex justify-between items-center mt-4">

                                                <div className="flex items-center gap-3">

                                                    <button
                                                        onClick={() => decreaseQty(item.id)}
                                                        className="w-9 h-9 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition"
                                                    >
                                                        -
                                                    </button>

                                                    <span className="font-semibold">
                                                        {item.qty}
                                                    </span>

                                                    <button
                                                        onClick={() => increaseQty(item.id)}
                                                        disabled={item.qty >= item.stock}
                                                        className={`w-9 h-9 rounded-xl transition ${
                                                            item.qty >= item.stock
                                                                ? "bg-neutral-300 cursor-not-allowed"
                                                                : "bg-black hover:bg-neutral-800 text-white"
                                                        }`}
                                                    >
                                                        +
                                                    </button>

                                                </div>

                                                <span className="text-sm text-gray-500">
                                                    Stok {item.stock}
                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                <div className="mt-8 border-t border-neutral-200 pt-6 space-y-6">
                                        
                                    <div className="rounded-2xl bg-neutral-100 p-5">

                                        <div className="rounded-3xl bg-neutral-100 p-3">

                                            <p className="text-sm text-neutral-500">
                                                Total Pembayaran
                                            </p>

                                            <h2 className="mt-3 text-4xl font-bold tracking-tight">
                                                Rp {total.toLocaleString("id-ID")}
                                            </h2>

                                        </div>

                                    </div>

                                    <div>

                                        <label className="block text-sm font-semibold mb-3">
                                            Metode Pembayaran
                                        </label>

                                        <div className="grid grid-cols-2 gap-3">

                                            {/* Tunai */}
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("cash")}
                                                className={`rounded-2xl border p-4 transition-all duration-200 ${
                                                    paymentMethod === "cash"
                                                        ? "border-black bg-black text-white shadow-lg"
                                                        : "border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-md"
                                                }`}
                                            >

                                                <div className="flex flex-col items-center justify-center gap-2">

                                                    <Banknote
                                                        className={`w-7 h-7 ${
                                                            paymentMethod === "cash"
                                                                ? "text-white"
                                                                : "text-neutral-700"
                                                        }`}
                                                    />

                                                    <span className="font-semibold">
                                                        Tunai
                                                    </span>

                                                </div>

                                            </button>

                                            {/* QRIS */}
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("qris")}
                                                className={`rounded-2xl border p-4 transition-all duration-200 ${
                                                    paymentMethod === "qris"
                                                        ? "border-black bg-black text-white shadow-lg"
                                                        : "border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-md"
                                                }`}
                                            >

                                                <div className="flex flex-col items-center justify-center gap-2">

                                                    <QrCode
                                                        className={`w-7 h-7 ${
                                                            paymentMethod === "qris"
                                                                ? "text-white"
                                                                : "text-neutral-700"
                                                        }`}
                                                    />

                                                    <span className="font-semibold">
                                                        QRIS
                                                    </span>

                                                </div>

                                            </button>

                                        </div>

                                    </div>

                                    {paymentMethod === "cash" && (                   
                                        <div>

                                            <label className="block text-sm font-semibold text-neutral-600 mb-2">
                                                Uang Dibayar
                                            </label>

                                            <input
                                                type="number"
                                                value={paid}
                                                onChange={(e) => setPaid(e.target.value)}
                                                placeholder="Masukkan nominal"
                                                className="w-full rounded-2xl border border-neutral-200 px-5 py-4 text-right text-2xl font-bold outline-none focus:border-black"
                                            />

                                        </div>
                                    )}

                                    {paymentMethod === "cash" && (
                                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

                                        <p className="text-sm text-emerald-600">
                                            Kembalian
                                        </p>

                                        <h2 className="text-4xl font-bold mt-2 text-emerald-700">
                                            Rp {change.toLocaleString("id-ID")}
                                        </h2>

                                    </div>
                                    )}

                                    <button
                                        onClick={saveTransaction}
                                        disabled={isDisabled}
                                        className={`w-full py-4 rounded-2xl font-semibold text-lg transition ${
                                            isDisabled
                                                ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                                : "bg-black text-white hover:bg-neutral-800"
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <CreditCard className="w-5 h-5" />
                                            <span>Simpan Transaksi</span>
                                        </div>
                                    </button>

                                </div>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}