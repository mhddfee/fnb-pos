import React, { forwardRef } from "react";

const Receipt = forwardRef(({ transaction }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                width: "300px",
                padding: "12px",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#000",
                background: "#fff",
            }}
        >
            {/* Header */}

            <div style={{ textAlign: "center" }}>

                <h2
                    style={{
                        margin: 0,
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    KALIMA
                </h2>

                <div>Point Of Sale System</div>

                <div>Jl. Raya Pamulang</div>

                <div>Telp. 0812-xxxx-xxxx</div>

            </div>

            <hr />

            <div>

                <div>
                    Invoice :
                    {" "}
                    {transaction.invoice}
                </div>

                <div>
                    Kasir :
                    {" "}
                    {transaction.user?.name}
                </div>

                <div>
                    Bayar :
                    {" "}
                    {transaction.payment_method === "cash"
                        ? "Tunai"
                        : "QRIS"}
                </div>

                <div>
                    Tanggal :
                    {" "}
                    {new Date(transaction.created_at).toLocaleString("id-ID")}
                </div>

            </div>

            <hr />

            {/* Produk */}

            {transaction.items.map((item) => (

                <div
                    key={item.id}
                    style={{
                        marginBottom: "10px",
                    }}
                >

                    <div
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        {item.product?.name}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >

                        <span>

                            {item.qty} x Rp {Number(item.price).toLocaleString("id-ID")}

                        </span>

                        <span>

                            Rp {Number(item.subtotal).toLocaleString("id-ID")}

                        </span>

                    </div>

                </div>

            ))}

            <hr />

            {/* Total */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <span>Total</span>

                <strong>
                    Rp {Number(transaction.total).toLocaleString("id-ID")}
                </strong>

            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <span>Bayar</span>

                <span>
                    Rp {Number(transaction.paid).toLocaleString("id-ID")}
                </span>

            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                }}
            >
                <span>Kembali</span>

                <span>
                    Rp {Number(transaction.change).toLocaleString("id-ID")}
                </span>

            </div>

            <hr />

            <div
                style={{
                    textAlign: "center",
                    marginTop: "12px",
                }}
            >
                <div>Terima kasih</div>

                <div>Semoga harimu menyenangkan :)</div>

                <br />

                <div>www.kalima.id</div>

            </div>

        </div>
    );
});

export default Receipt;