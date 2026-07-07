<<<<<<< HEAD
# 🌐 Network Equipment Store (NES)

> Website e-commerce untuk penjualan perangkat jaringan (network equipment) seperti router, access point, kabel, modem, mikrotik, dan aksesoris jaringan lainnya.

---

## 📋 Informasi Umum

| Item | Detail |
|------|--------|
| **Nama Project** | Network Equipment Store (NES) |
| **Versi** | 2.0 - Static HTML/CSS/JS |
| **Versi Sebelumnya** | 1.0 - CodeIgniter 4 (PHP) |
| **Tanggal Update** | 14 Juni 2026 |
| **Teknologi** | HTML5, CSS3, JavaScript ES6 |
| **Backend** | Tidak ada (Frontend Only) |
| **Database** | Data dummy via JavaScript (`data.js`) |

---

## 🚀 Cara Menjalankan Website

1. **Buka file `index.html`** langsung di browser (Google Chrome, Firefox, Edge)
2. Atau gunakan Live Server extension di VS Code
3. Tidak memerlukan server PHP, database, atau instalasi apapun

---

## 🔐 Akun Login

### Customer
| Email | Password | Nama |
|-------|----------|------|
| `syaffa@gmail.com` | `123` | Syaffa |
| `customer@gmail.com` | `123` | Customer |

### Admin
| Email | Password | Role |
|-------|----------|------|
| `admin@gmail.com` | `admin123` | Admin |

### Owner
| Email | Password | Role |
|-------|----------|------|
| `laura@gmail.com` | `owner123` | Owner |

> **Note:** Login Admin & Owner menggunakan halaman login khusus (`login-internal.html`) dengan tampilan dark theme yang berbeda dari login customer.

---

## 📁 Struktur Folder

```
e-commerce web/
├── index.html                  # Halaman utama (katalog + detail produk)
├── contact.html                # Halaman kontak
├── information.html            # Halaman informasi toko
├── shipping-policy.html        # Kebijakan pengiriman
├── cart.html                   # Keranjang belanja
├── checkout.html               # Halaman checkout
├── pesanan-saya.html           # Daftar pesanan customer
├── profile.html                # Pengaturan profil
├── login.html                  # Login customer (tema terang)
├── register.html               # Registrasi customer
├── login-internal.html         # Login admin/owner (tema gelap)
│
├── admin/                      # Panel Admin
│   ├── dashboard.html          # Dashboard admin
│   ├── produk.html             # Manajemen produk (CRUD)
│   ├── kategori.html           # Manajemen kategori
│   ├── merk.html               # Manajemen merk
│   ├── transaksi.html          # Daftar transaksi
│   └── transaksi-detail.html   # Detail transaksi
│
├── owner/                      # Panel Owner
│   ├── dashboard.html          # Dashboard owner
│   ├── produk.html             # Daftar produk (read-only)
│   └── transaksi.html          # Transaksi selesai
│
├── assets/                     # File statis (CSS, JS)
│   ├── css/
│   │   ├── style.css           # CSS utama (customer)
│   │   ├── admin.css           # CSS panel admin
│   │   ├── owner.css           # CSS panel owner
│   │   └── auth.css            # CSS halaman login/register
│   └── js/
│       ├── data.js             # Data dummy (produk, kategori, user, transaksi)
│       ├── app.js              # JS utama (navbar, carousel, render halaman)
│       ├── auth.js             # Sistem login/logout/session
│       ├── cart.js             # Keranjang belanja
│       ├── checkout.js         # Checkout & pesanan
│       ├── admin.js            # Panel admin (CRUD, modal, tabel)
│       └── owner.js            # Panel owner
│
├── public/
│   └── uploads/                # Gambar produk & banner
│       ├── profile/            # Logo & foto profil
│       ├── banner1.jpg         # Banner promo
│       └── [produk images]     # Gambar produk
│
├── ec.sql                      # Referensi database asli
├── LICENSE                     # Lisensi
└── README.md                   # Dokumentasi (file ini)
```

---

## 📄 Daftar Halaman & Fitur

### 🛒 Customer (Pelanggan)

| Halaman | Fitur |
|---------|-------|
| **Home** (`index.html`) | Banner carousel auto-slide, katalog produk, filter kategori, search |
| **Detail Produk** (`index.html?produk=ID`) | Gambar zoom, deskripsi, spesifikasi, tab review, qty, add to cart, checkout langsung |
| **Kategori** (`index.html?kategori=ID`) | Filter produk berdasarkan kategori |
| **Keranjang** (`cart.html`) | Pilih item (checkbox), update qty, hapus, ringkasan belanja |
| **Checkout** (`checkout.html`) | Alamat kirim, pilih bank & kurir, proses pembayaran |
| **Pesanan Saya** (`pesanan-saya.html`) | Tab filter status (Semua/Proses/Dikemas/Dikirim/Selesai) |
| **Profil** (`profile.html`) | Edit nama, HP, alamat, kota |
| **Contact** | Info kontak WhatsApp, Email, Instagram, form pesan |
| **Information** | Tentang toko, kualitas, metode pembayaran |
| **Shipping** | Jasa kirim, ongkir, jadwal, standar packing |

### 🔧 Admin

| Halaman | Fitur |
|---------|-------|
| **Dashboard** | Summary cards (Customer, Revenue, Transaction) |
| **Produk** | Tabel produk, search, tambah/edit (modal form), detail (modal), hapus |
| **Kategori** | Tambah kategori, edit (modal popup), hapus |
| **Merk** | Tambah merk, edit (modal popup), hapus |
| **Transaksi** | Tabel semua transaksi, update status (dropdown), detail |
| **Detail Transaksi** | Info pesanan lengkap, update status buttons |

### 👤 Owner

| Halaman | Fitur |
|---------|-------|
| **Dashboard** | Summary cards (Customer, Revenue, Transaction) |
| **Product** | Tabel produk (read-only) |
| **Transaction** | Tabel transaksi selesai, tombol cetak PDF |

---

## ✨ Fitur Desain & Interaksi

| Fitur | Deskripsi |
|-------|-----------|
| **Hamburger Menu** | Navbar berubah menjadi sidebar menu di mobile |
| **Scroll Reveal** | Elemen muncul dari bawah saat scroll (hanya 1x, menggunakan IntersectionObserver) |
| **Product Card Hover** | Card naik + shadow membesar (`translateY(-12px) + scale(1.02)`) |
| **Product Card Click** | Card menyusut sesaat (`scale(0.95)`) |
| **Image Zoom** | Gambar produk zoom saat hover card (`scale(1.15)`) |
| **Banner Carousel** | Auto-slide setiap 4 detik dengan custom dot indicators |
| **Toast Notification** | Notifikasi popup sukses/error di pojok kanan atas |
| **Modal Popup** | Form edit kategori/merk, detail produk admin |
| **Responsive Design** | Desktop (4 kolom), Tablet (3 kolom), Mobile (2 kolom) |
| **Smooth Transitions** | Semua interaksi menggunakan CSS transitions |
| **Custom Scrollbar** | Scrollbar browser di-custom |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Primary Color** | `#1a6d4b` (Hijau) |
| **Gold Accent** | `#ffd700` |
| **Danger** | `#dc3545` |
| **Font** | Inter (Google Fonts) |
| **Border Radius** | 8px - 20px |
| **Shadow** | 4 level (sm, md, lg, xl) |

---

## 💾 Data Dummy

Data dummy diambil dari file `ec.sql` dan dikonversi ke JavaScript:

- **18 Produk** perangkat jaringan dengan gambar, harga, stok, deskripsi, spesifikasi
- **8 Kategori**: Router, Accesories, Access Point, Cable & Connector, Modem, Wireless Adapter, Mikrotik, TP-Link
- **5 Merk**: Kiyomitsu, ASUS, TP-Link, Linksys, Mikrotik
- **4 User**: 1 Admin, 1 Owner, 2 Customer
- **10 Transaksi** dengan berbagai status (proses, dikemas, dikirim, selesai)

---

## 🔄 Perubahan dari Versi 1.0 (CI4) ke 2.0 (Static)

| Aspek | v1.0 (CodeIgniter 4) | v2.0 (Static HTML/JS) |
|-------|---------------------|----------------------|
| **Backend** | PHP 8.2 + CI4 Framework | Tidak ada |
| **Database** | MySQL/MariaDB | localStorage + data.js |
| **Session** | PHP Session | localStorage |
| **Routing** | CI4 Router | Query parameter (?produk=ID) |
| **Template** | CI4 Layouts (renderSection) | Vanilla HTML + JS DOM |
| **Auth** | bcrypt hash + DB lookup | Plain text comparison |
| **Server** | Apache/Nginx + PHP | Browser langsung / Live Server |
| **Deployment** | XAMPP/Server | Buka index.html |

### File/Folder yang Dihapus
- `app/Controllers/` - Controller CI4
- `app/Config/` - Konfigurasi CI4
- `app/Database/` - Migration & Seeds
- `app/Filters/` - HTTP Filter
- `app/Helpers/` - Helper PHP
- `app/Language/` - Language files
- `app/Libraries/` - Library PHP
- `app/Models/` - Model PHP
- `app/ThirdParty/` - Third party
- `app/Views/` - View PHP (diganti HTML)
- `system/` - Core CI4 Framework
- `vendor/` - Composer dependencies
- `tests/` - Unit tests
- `writable/` - CI4 writable directory
- `composer.json`, `composer.lock`, `phpunit.xml.dist`, `preload.php`, `spark`, `.env`

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| **> 992px** (Desktop) | Grid 4 kolom, full navbar |
| **768px - 992px** (Tablet) | Grid 3 kolom, search hidden |
| **< 768px** (Mobile) | Grid 2 kolom, hamburger menu, sidebar nav |
| **< 480px** (Small Mobile) | Grid 2 kolom, carousel height dikurangi |

---

## ⚠️ Catatan Penting

1. Website ini adalah **versi demo/presentasi** tanpa backend
2. Data disimpan di **localStorage** browser — akan hilang jika cache di-clear
3. Fitur upload gambar produk hanya **simulasi** (tidak menyimpan file)
4. PIN pembayaran default untuk semua akun: `123456`
5. Ongkir: Jakarta = **Gratis**, Luar Jakarta = **Rp 10.000**

---

## 📝 Lisensi

Lihat file [LICENSE](LICENSE) untuk informasi lisensi.

---

*Dibuat dengan ❤️ menggunakan HTML5, CSS3, dan JavaScript ES6*
=======
# Network-Equipment-Store
Web Penjualan Perangkat Jaringan Komputer
>>>>>>> d8973485dd2d1945532d90fa60eaad169befbc00
