// Cek login
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'login.html';
}

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
});

// Persistence helpers
const BOOKS_KEY = 'catalogBooks';
function loadBooksFromStorage() {
    try {
        const raw = localStorage.getItem(BOOKS_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
    } catch (e) {}
    return null;
}

function saveBooksToStorage() {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

// Variable untuk menyimpan data buku (prefer localStorage; fallback ke dataKatalogBuku)
let books = loadBooksFromStorage() || [...dataKatalogBuku];

// Fungsi untuk menampilkan data buku dalam bentuk kartu
function displayBooks(booksToDisplay = books) {
    const grid = document.getElementById('bookGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (booksToDisplay.length === 0) {
        grid.innerHTML = '<div class="text-center" style="color:#6b7280;">Tidak ada data buku</div>';
        return;
    }

    booksToDisplay.forEach((book) => {
        const card = document.createElement('div');
        card.className = 'book-card';

        const initials = (book.judul || 'Buku').split(' ').slice(0,2).map(w => w && w[0] ? w[0] : '').join('').toUpperCase() || 'BK';

        const thumb = book.image && book.image.trim() ? `<img src="${book.image}" alt="${book.judul}" />` : initials;

        card.innerHTML = `
            <div class="book-thumb">${thumb}</div>
            <div>
                <div class="book-meta">
                    <span class="chip">${book.kategori}</span>
                    <span class="chip">${book.penerbit}</span>
                    <span class="chip">${book.tahun}</span>
                </div>
                <div class="book-title">${book.judul}</div>
                <div style="margin-bottom:6px; font-size:14px; color:#6b7280;">${book.penulis}</div>
                <div class="book-price">${formatRupiah(book.harga)}</div>
                <div class="book-stock">Stok: ${book.stok}</div>
                <div class="book-actions">
                    <button class="btn btn-cart" onclick="addToCartFromCatalog(${book.id})">Tambah ke Keranjang</button>
                    <div class="book-actions-secondary">
                        <button class="btn btn-ghost" onclick="editBook(${book.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteBook(${book.id})">Hapus</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Fungsi format Rupiah
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Fungsi search/filter buku
function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredBooks = books.filter(book => 
        book.judul.toLowerCase().includes(searchTerm) ||
        book.penulis.toLowerCase().includes(searchTerm) ||
        book.kategori.toLowerCase().includes(searchTerm) ||
        book.penerbit.toLowerCase().includes(searchTerm)
    );
    
    displayBooks(filteredBooks);
}

// Tambah ke keranjang dari katalog (redirect ke checkout)
function addToCartFromCatalog(bookId) {
    const qty = 1;
    window.location.href = `checkout.html?add=${bookId}&qty=${qty}`;
}

// Fungsi untuk membuka modal tambah buku
function openAddBookModal() {
    document.getElementById('addBookModal').classList.add('active');
}

// Fungsi untuk menutup modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Handler form tambah buku
document.getElementById('addBookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    // Dapatkan ID baru (ID tertinggi + 1)
    const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;

    const baseData = {
        id: nextId,
        judul: document.getElementById('bookTitle').value,
        penulis: document.getElementById('bookAuthor').value,
        penerbit: document.getElementById('bookPublisher').value,
        tahun: parseInt(document.getElementById('bookYear').value),
        harga: parseInt(document.getElementById('bookPrice').value),
        stok: parseInt(document.getElementById('bookStock').value),
        kategori: document.getElementById('bookCategory').value,
        isbn: document.getElementById('bookISBN').value,
        deskripsi: document.getElementById('bookDescription').value,
        image: (document.getElementById('bookImage').value || '').trim()
    };

    const fileInput = document.getElementById('bookImageFile');
    const file = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;

    const finish = (imageDataUrl) => {
        const newBook = { ...baseData };
        if (imageDataUrl) newBook.image = imageDataUrl;
        books.push(newBook);
        saveBooksToStorage();
        displayBooks();
        form.reset();
        closeModal('addBookModal');
        alert('Buku berhasil ditambahkan!');
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = () => finish(reader.result);
        reader.readAsDataURL(file);
    } else {
        finish(baseData.image);
    }
});

// Fungsi untuk edit buku
function editBook(id) {
    const book = books.find(b => b.id === id);
    
    if (!book) {
        alert('Buku tidak ditemukan!');
        return;
    }
    
    // Isi form edit dengan data buku
    document.getElementById('editBookId').value = book.id;
    document.getElementById('editBookTitle').value = book.judul;
    document.getElementById('editBookAuthor').value = book.penulis;
    document.getElementById('editBookPrice').value = book.harga;
    document.getElementById('editBookStock').value = book.stok;
    const editImg = document.getElementById('editBookImage');
    if (editImg) editImg.value = book.image || '';
    
    // Buka modal edit
    document.getElementById('editBookModal').classList.add('active');
}

// Handler form edit buku
document.getElementById('editBookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bookId = parseInt(document.getElementById('editBookId').value);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
        alert('Buku tidak ditemukan!');
        return;
    }
    
    const applyUpdate = (maybeDataUrl) => {
        // Update data buku
        books[bookIndex].judul = document.getElementById('editBookTitle').value;
        books[bookIndex].penulis = document.getElementById('editBookAuthor').value;
        books[bookIndex].harga = parseInt(document.getElementById('editBookPrice').value);
        books[bookIndex].stok = parseInt(document.getElementById('editBookStock').value);
        const imgUrl = (document.getElementById('editBookImage').value || '').trim();
        books[bookIndex].image = maybeDataUrl || imgUrl;
        saveBooksToStorage();
        displayBooks();
        closeModal('editBookModal');
        alert('Buku berhasil diupdate!');
    };

    const fileInput = document.getElementById('editBookImageFile');
    const file = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = () => applyUpdate(reader.result);
        reader.readAsDataURL(file);
    } else {
        applyUpdate(null);
    }
});

// Fungsi untuk hapus buku
function deleteBook(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
        return;
    }
    
    // Hapus buku dari array
    books = books.filter(b => b.id !== id);
    saveBooksToStorage();
    // Refresh tampilan
    displayBooks();
    
    alert('Buku berhasil dihapus!');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// Reset katalog ke data default dari data.js (hapus yang tersimpan di localStorage)
function resetCatalog() {
    if (!confirm('Reset katalog ke data default? Perubahan yang tersimpan akan hilang.')) return;
    localStorage.removeItem(BOOKS_KEY);
    // Muat ulang halaman agar books diinisialisasi ulang dari dataKatalogBuku
    location.reload();
}

// Inisialisasi tampilan
displayBooks();
