import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({ products }) {
    const [cart, setCart] = useState([]);
    const [paid, setPaid] = useState("");

    console.log(usePage().props);

    function addToCart(product) {
        const existing = cart.find(item => item.id === product.id);

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
                    qty: 1,
                    subtotal: Number(product.price),
                },
            ]);
        }
    }

    function increaseQty(id) {
        setCart(
            cart.map(item =>
                item.id === id
                    ? {
                        ...item,
                        qty: item.qty + 1,
                        subtotal: (item.qty + 1) * item.price,
                    }
                    : item
            )
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

    function saveTransaction() {
        router.post("/cashier", {
            cart,
            total,
            paid: Number(paid),
        });
    }
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">
                Kasir
            </h1>
            
            <div className="grid grid-cols-4 gap-5">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl shadow p-4"
                    >
                        <h2 className="font-bold">
                            {product.name}
                        </h2>

                        <p className="text-gray-500">
                            {product.category.name}
                        </p>

                        <p className="text-blue-600 font-bold mt-3">
                            Rp {Number(product.price).toLocaleString("id-ID")}
                        </p>

                        <button
                            onClick={() => addToCart(product)}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                        >
                            Tambah
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Keranjang
                </h2>

                {cart.length === 0 ? (
                    <p>Belum ada produk.</p>
                ) : (
                    <>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Produk</th>
                                    <th>Qty</th>
                                    <th>Harga</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td className="text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => decreaseQty(item.id)}
                                                    className="bg-red-500 text-white px-2 rounded"
                                                >
                                                    -
                                                </button>

                                                <span>{item.qty}</span>

                                                <button
                                                    onClick={() => increaseQty(item.id)}
                                                    className="bg-green-500 text-white px-2 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            Rp {item.price.toLocaleString("id-ID")}
                                        </td>
                                        <td className="text-center">
                                            Rp {item.subtotal.toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div className="mt-8 border-t pt-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Total
                                </span>

                                <span className="text-2xl font-bold">
                                    Rp {total.toLocaleString("id-ID")}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <label className="font-semibold">
                                    Uang Dibayar
                                </label>

                                <input
                                    type="number"
                                    value={paid}
                                    onChange={(e) => setPaid(e.target.value)}
                                    className="border rounded-lg px-3 py-2 w-56 text-right"
                                    placeholder="0"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Kembalian
                                </span>

                                <span className="text-2xl font-bold text-green-600">
                                    Rp {change.toLocaleString("id-ID")}
                                </span>
                            </div>

                            <button
                                onClick={saveTransaction}
                                disabled={cart.length === 0 || Number(paid) < total}
                                className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
                            >
                                Simpan Transaksi
                            </button>
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}