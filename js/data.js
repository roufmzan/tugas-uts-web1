// Data Katalog Buku
// Diadaptasi dari struktur yang Anda berikan (kodeBarang, namaBarang, jenisBarang, edisi, stok, harga string, cover)
// Dipetakan ke skema aplikasi saat ini agar kompatibel dengan UI:
// judul = namaBarang, kategori = jenisBarang, penerbit = jenisBarang, tahun = 2023 (default), isbn = kodeBarang, image = cover
const dataKatalogBuku = [
    {
        id: 1,
        judul: "Pengantar Ilmu Komunikasi",
        penulis: "-",
        penerbit: "Buku Ajar",
        tahun: 2023,
        harga: 180000,
        stok: 548,
        kategori: "Buku Ajar",
        isbn: "ASIP4301",
        deskripsi: "",
        image: "img/pengantar_komunikasi.jpg"
    },
    {
        id: 2,
        judul: "Manajemen Keuangan",
        penulis: "-",
        penerbit: "Buku Ajar",
        tahun: 2023,
        harga: 220000,
        stok: 392,
        kategori: "Buku Ajar",
        isbn: "EKMA4002",
        deskripsi: "",
        image: "img/manajemen_keuangan.jpg"
    },
    {
        id: 3,
        judul: "Kepemimpinan",
        penulis: "-",
        penerbit: "Buku Ajar",
        tahun: 2023,
        harga: 150000,
        stok: 278,
        kategori: "Buku Ajar",
        isbn: "EKMA4310",
        deskripsi: "",
        image: "img/kepemimpinan.jpg"
    },
    {
        id: 4,
        judul: "Mikrobiologi Dasar",
        penulis: "-",
        penerbit: "Buku Ajar",
        tahun: 2023,
        harga: 200000,
        stok: 165,
        kategori: "Buku Ajar",
        isbn: "BIOL4211",
        deskripsi: "",
        image: "img/mikrobiologi.jpg"
    },
    {
        id: 5,
        judul: "Perkembangan Anak Usia Dini",
        penulis: "-",
        penerbit: "Buku Ajar",
        tahun: 2023,
        harga: 250000,
        stok: 204,
        kategori: "Buku Ajar",
        isbn: "PAUD4401",
        deskripsi: "",
        image: "img/paud_perkembangan.jpg"
    }
];

// Data User untuk Login
const dataUser = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        password: "rina123",
        role: "User",
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@gmail.com",
        password: "agus123",
        role: "User",
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@gmail.com",
        password: "siti123",
        role: "Admin",
    }
];

// Data Tracking Pengiriman
const dataTracking = [
    {
        noDO: "20230012",
        namaPemesan: "Rina Wulandari",
        status: "Dalam Perjalanan",
        progress: 60,
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        jenisPaket: "0JKT01",
        totalPembayaran: 180000,
        riwayat: [
            { tanggal: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka" },
            { tanggal: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: TANGERANG SELATAN" },
            { tanggal: "2025-08-25 10:12:20", keterangan: "Diteruskan ke Kantor Jakarta Selatan" }
        ]
    },
    {
        noDO: "20230013",
        namaPemesan: "Agus Pranoto",
        status: "Dikirim",
        progress: 100,
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        jenisPaket: "0UPBJJBDG",
        totalPembayaran: 220000,
        riwayat: [
            { tanggal: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka" },
            { tanggal: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: TANGERANG SELATAN" },
            { tanggal: "2025-08-25 16:30:10", keterangan: "Diteruskan ke Kantor Kota Bandung" },
            { tanggal: "2025-08-26 12:15:33", keterangan: "Tiba di Hub: Kota BANDUNG" },
            { tanggal: "2025-08-26 15:06:12", keterangan: "Proses antar ke Cimahi" },
            { tanggal: "2025-08-26 20:00:00", keterangan: "Selesai Antar. Penerima: Agus Pranoto" }
        ]
    }
];

// Data History Transaksi
const dataTransaksi = [
    {
        id: "TRX001",
        tanggal: "2024-11-01",
        pelanggan: "Ahmad Fauzi",
        totalItem: 3,
        totalBayar: 450000,
        status: "Selesai"
    },
    {
        id: "TRX002",
        tanggal: "2024-11-02",
        pelanggan: "Siti Nurhaliza",
        totalItem: 2,
        totalBayar: 380000,
        status: "Selesai"
    },
    {
        id: "TRX003",
        tanggal: "2024-11-03",
        pelanggan: "Budi Santoso",
        totalItem: 2,
        totalBayar: 290000,
        status: "Proses"
    },
    {
        id: "TRX004",
        tanggal: "2024-11-04",
        pelanggan: "Dewi Lestari",
        totalItem: 1,
        totalBayar: 200000,
        status: "Proses"
    }
];
