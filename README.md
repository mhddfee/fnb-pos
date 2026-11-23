# F&B POS - Point of Sale & Inventory Management

Aplikasi Point of Sale (POS) berbasis web untuk membantu pengelolaan transaksi penjualan dan inventaris pada usaha Food & Beverage (F&B).

Project ini dikembangkan menggunakan Laravel dan React dengan Inertia.js sebagai penghubung antara backend dan frontend.

## ✨ Fitur

- Dashboard untuk menampilkan ringkasan informasi.
- Manajemen kategori produk.
- Manajemen produk.
- Manajemen stok dan restock produk.
- Manajemen supplier.
- Manajemen pengguna.
- Laporan transaksi dan penjualan.
- Cetak struk transaksi.

## 🛠️ Teknologi

- **Backend:** Laravel
- **Frontend:** React.js
- **Bridge:** Inertia.js
- **Styling:** Tailwind CSS
- **Database:** MySQL
- **Development Environment:** Laragon
- **Build Tool:** Vite

## 📋 Persyaratan

Pastikan perangkat sudah memiliki:

- PHP
- Composer
- Node.js dan npm
- MySQL
- Laragon atau web server sejenis

## 🚀 Cara Instalasi

1. Clone repository:

   ```bash
   git clone https://github.com/mhddfee/fnb-pos.git
   ```

2. Masuk ke folder project:

   ```bash
   cd fnb-pos/backend
   ```

3. Install dependency Laravel:

   ```bash
   composer install
   ```

4. Salin file environment:

   ```bash
   cp .env.example .env
   ```

   Pada Windows, file `.env.example` juga bisa disalin secara manual menjadi `.env`.

5. Generate application key:

   ```bash
   php artisan key:generate
   ```

6. Atur konfigurasi database pada file `.env`.

7. Jalankan migration:

   ```bash
   php artisan migrate
   ```

8. Install dependency frontend:

   ```bash
   npm install
   ```

## ▶️ Menjalankan Project

Jalankan Laravel:

```bash
php artisan serve
```

Buka terminal baru, lalu jalankan Vite:

```bash
npm run dev
```

Buka aplikasi melalui:

```text
http://127.0.0.1:8000
```

## 👨‍💻 Developer

**Muhammad Daffie**

GitHub: [@mhddfee](https://github.com/mhddfee)

---

This project was developed as a learning project for building a web-based Point of Sale and Inventory Management System for F&B businesses.
