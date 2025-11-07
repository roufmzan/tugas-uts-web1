## Nama : RO'UF MUHAMMAD FAUZAN
## NIM : 312410157
## Kelas : TI.24.A.1
## Mata Kuliah : Pemrograman Web 1 ( Ulangan Tengah Semester )
## Dosen Pengampu : Agung Nugroho, S.Kom., M.Kom.

# 📚 Aplikasi Web Pemesanan Buku Online

Aplikasi web sederhana untuk pemesanan buku pada toko online. Aplikasi ini fokus pada proses front-end dengan data dummy yang disimpan dalam file JavaScript.

## 🎯 Fitur Utama

### 1. **Halaman Login** (login.html)
<img width="1440" height="900" alt="Tangkapan Layar 2025-11-07 pukul 16 20 35" src="https://github.com/user-attachments/assets/0de0ce5e-7a8a-404f-8f55-ffb5750fc9de" />

- Input email dan password
- Validasi login dengan data dummy
- Alert untuk kredensial yang salah
- Modal box untuk Lupa Password
- Modal box untuk Pendaftaran akun baru
- **Akun baru tersimpan di localStorage** - Akun yang didaftarkan akan tersimpan secara permanen
- Validasi lengkap: format email, panjang password (min 6 karakter), nama (min 3 karakter)
- Auto-fill email setelah registrasi berhasil

**Kredensial Default:**
- Rina Wulandari — Email: `rina@gmail.com` | Password: `rina123` | Role: User
- Agus Pranoto — Email: `agus@gmail.com` | Password: `agus123` | Role: User
- Siti Marlina — Email: `siti@gmail.com` | Password: `siti123` | Role: Admin

**Cara Daftar Akun Baru:**
<img width="1440" height="900" alt="Tangkapan Layar 2025-11-07 pukul 16 21 14" src="https://github.com/user-attachments/assets/9b2696ca-3c90-4d6f-bc93-ec3a505512f3" />

1. Klik tombol "Daftar" di halaman login
2. Isi form pendaftaran (nama, email, password)
3. Akun akan tersimpan di localStorage browser
4. Login dengan akun yang baru didaftarkan

### 2. **Dashboard** (dashboard.html)
<img width="1440" height="900" alt="Tangkapan Layar 2025-11-07 pukul 16 21 30" src="https://github.com/user-attachments/assets/49e4389b-8f71-4a6a-85c6-350a57273bf1" />

- Greeting dinamis berdasarkan waktu (Pagi/Siang/Sore/Malam)
- Tanggal dan waktu real-time
- Navigasi ke semua menu utama:
  - Katalog Buku
  - Tracking Pengiriman
  - Laporan Pemesanan
  - History Transaksi

### 3. **Informasi Stok/Katalog** (stok.html)
<img width="1440" height="900" alt="Tangkapan Layar 2025-11-07 pukul 16 21 46" src="https://github.com/user-attachments/assets/c068ae6d-59e2-42fa-8f9b-709bc7be4697" />

- Menampilkan data buku secara dinamis dari `data.js` dalam bentuk grid kartu
- Pencarian/filter buku
- Tambah buku baru
- Edit data buku
- Hapus buku dari katalog
- Upload cover: URL atau file (disimpan sebagai Data URL di localStorage)
- Persistensi katalog di localStorage (perubahan tersimpan)
- Tombol "Reset Katalog" untuk menghapus data tersimpan dan memuat ulang data default
- Tombol "Tambah ke Keranjang" untuk langsung menuju halaman checkout
- Validasi form input

### 4. **Halaman Pemesanan** (checkout.html)
<img width="1440" height="900" alt="Tangkapan Layar 2025-11-07 pukul 16 23 15" src="https://github.com/user-attachments/assets/67c5fec5-01d1-4fc0-8cfe-24a1ef96e6df" />

- Pilih buku dari katalog
- Keranjang belanja dinamis
- Tambah/ubah/hapus item pesanan
- Form informasi pemesan (nama, email, telepon, alamat)
- Form informasi pembayaran (metode pembayaran dan pengiriman)
- Ringkasan pembayaran otomatis
- Generate nomor Delivery Order

### 5. **Tracking Pengiriman** (tracking.html)
<img width="1440" height="900" alt="Tangkapan Layar 2025-11-07 pukul 16 24 10" src="https://github.com/user-attachments/assets/d46ab1ec-673d-4424-aabb-a89171990d0f" />

- Input nomor Delivery Order
- Menampilkan informasi pengiriman:
  - Nama pemesan
  - Status pengiriman dengan progress bar
  - Detail ekspedisi
  - Tanggal kirim
  - Jenis paket
  - Total pembayaran
- Timeline riwayat pengiriman

### Bonus: Halaman Tambahan

#### **Laporan Pemesanan** (laporan.html)
<img width="1440" height="900" alt="Tangkapan Layar 2025-11-07 pukul 16 24 33" src="https://github.com/user-attachments/assets/7a5fa05b-5042-4050-b2bb-ecb75dab9e7e" />

- Tabel laporan transaksi
- Filter berdasarkan status
- Pencarian transaksi
- Statistik ringkasan (total transaksi, pesanan selesai, revenue)

#### **History Transaksi** (history.html)
<img width="1440" height="900" alt="Tangkapan Layar 2025-11-07 pukul 16 24 39" src="https://github.com/user-attachments/assets/f79ca3fa-706d-4f29-b9d0-f485745add02" />

- Riwayat lengkap transaksi
- Pencarian berdasarkan ID atau nama pelanggan
- Modal detail transaksi
- Tampilan kartu yang interaktif

## 📁 Struktur Folder

```
preject uts/
│
├── css/
│   └── style.css          # Styling utama aplikasi
│
├── js/
│   ├── data.js            # Data dummy (katalog buku, user, tracking, transaksi)
│   ├── login.js           # Fungsi login dan modal
│   ├── dashboard.js       # Fungsi dashboard dan greeting
│   ├── stok.js            # Fungsi CRUD katalog buku
│   ├── checkout.js        # Fungsi keranjang dan checkout
│   ├── tracking.js        # Fungsi tracking pengiriman
│   ├── laporan.js         # Fungsi laporan pemesanan
│   └── history.js         # Fungsi history transaksi
│
├── login.html             # Halaman login
├── dashboard.html         # Halaman dashboard
├── stok.html              # Halaman katalog buku
├── checkout.html          # Halaman pemesanan
├── tracking.html          # Halaman tracking pengiriman
├── laporan.html           # Halaman laporan
├── history.html           # Halaman history transaksi
└── README.md              # Dokumentasi
```

## 🚀 Cara Menjalankan

1. **Download/Clone** project ini
2. Buka file `login.html` di browser
3. Login dengan kredensial default
4. Explore semua fitur aplikasi!

**Catatan:** Aplikasi ini menggunakan vanilla JavaScript dan tidak memerlukan server. Cukup buka file HTML di browser modern (Chrome, Firefox, Edge, Safari).

## 💡 Fitur Teknis

### HTML
- Struktur semantik dan valid
- Form validation
- Accessible markup
- Meta tags lengkap

### CSS
- Modern design dengan gradient background
- Responsive layout
- CSS Variables untuk theming
- Smooth transitions dan animations
- Grid dan Flexbox layout
- Card-based UI design

### JavaScript
- DOM Manipulation
- Event Handling
- Form Validation
- Local Storage untuk session management
- Dynamic content rendering
- Array methods (map, filter, reduce, find)
- Template literals
- Modular code structure

## 🎨 Desain & UI/UX

- **Color Scheme:** Gradient purple dengan accent biru
- **Typography:** Segoe UI untuk readability
- **Icons:** Emoji untuk visual appeal
- **Components:** 
  - Cards untuk grouping konten
  - Modal boxes untuk interaksi
  - Progress bars untuk tracking
  - Badges untuk status
  - Tables untuk data display
  - Forms dengan validation
- **Responsiveness:** Mobile-friendly dengan media queries

## 📊 Data Dummy

### Katalog Buku
- 5 buku contoh dengan kategori berbeda
- Informasi lengkap (judul, penulis, penerbit, harga, stok, ISBN)

### User
- 3 user default untuk testing login (lihat bagian Kredensial Default)
- User baru yang didaftarkan tersimpan di localStorage browser
- Sistem menggabungkan user default dengan user terdaftar

### Tracking
- 2 data tracking contoh dengan status berbeda
- Progress bar dinamis
- Timeline history

### Transaksi
- 4 transaksi dengan status berbeda
- Data lengkap untuk laporan

## ✨ Kreativitas Tambahan

1. **Persistent User Registration** - Akun terdaftar tersimpan di localStorage secara permanen
2. **Time-based Greeting** - Greeting berubah sesuai waktu lokal
3. **Real-time Clock** - Jam digital yang update setiap detik
4. **Progress Bar** - Visual indicator untuk status pengiriman
5. **Timeline** - Riwayat pengiriman dengan timeline visual
6. **Dynamic Statistics** - Kalkulasi otomatis dari data
7. **Shopping Cart** - Keranjang belanja interaktif
8. **Search & Filter** - Pencarian dan filter di berbagai halaman
9. **Modal Dialogs** - Interaksi smooth dengan modal
10. **Responsive Design** - Optimal di desktop dan mobile
11. **Auto-fill Form** - Form auto-fill dari user session
12. **Email Validation** - Validasi format email menggunakan regex
13. **Password Strength** - Minimal 6 karakter untuk keamanan

## 🎯 Kriteria Penilaian

### ✅ Struktur HTML
- Semantik dan valid
- Form lengkap dengan validation
- Struktur yang rapi dan terorganisir

### ✅ Desain CSS
- Modern dan menarik
- Responsive
- Consistent styling
- Smooth animations

### ✅ JavaScript DOM
- Manipulasi DOM untuk tampilan dinamis
- Event handling yang baik
- Data management dengan array methods
- Form validation

### ✅ Validasi Form & Alert
- Feedback untuk setiap aksi user
- Error handling yang baik
- Alert yang informatif

### ✅ Modularitas File
- File terpisah untuk CSS dan JS
- Data terpisah di data.js
- Struktur folder yang jelas

### ✅ Kreativitas
- UI/UX yang menarik
- Fitur tambahan (laporan, history)
- Interactive elements
- Visual feedback

## 📝 Catatan Pengerjaan

- **Tidak menggunakan framework** - Pure HTML, CSS, JavaScript
- **Data dummy** - Semua data dari file JavaScript (data.js)
- **Front-end fokus** - Tidak ada backend/database
- **Local Storage** - Untuk session management
- **Browser Modern** - Ditest di Chrome, Firefox, Edge

## 👨‍💻 Pengembang

Tugas UTS - Pemrograman Web 1
Semester 3

---

**Happy Testing! 🚀**
