// Cek apakah user sudah login
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    // Jika belum login, redirect ke halaman login
    window.location.href = 'login.html';
}

// Tampilkan nama user
const rawName = currentUser.nama || '';
const isAdminName = rawName.trim().toLowerCase() === 'admin';
const navName = isAdminName ? 'User' : rawName;
document.getElementById('userName').textContent = navName;

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
});

// Fungsi untuk menampilkan greeting berdasarkan waktu
function displayGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greetingText = '';
    
    if (hour >= 5 && hour < 11) {
        greetingText = 'Selamat Pagi';
    } else if (hour >= 11 && hour < 15) {
        greetingText = 'Selamat Siang';
    } else if (hour >= 15 && hour < 18) {
        greetingText = 'Selamat Sore';
    } else {
        greetingText = 'Selamat Malam';
    }

    const displayName = isAdminName ? '' : rawName;
    document.getElementById('greeting').textContent = displayName ? `${greetingText}, ${displayName}!` : `${greetingText}!`;
}

// Fungsi untuk menampilkan tanggal dan waktu
function displayDateTime() {
    const now = new Date();
    
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    
    const dateTimeString = `${dayName}, ${day} ${month} ${year} - ${hour}:${minute}:${second}`;
    document.getElementById('dateTime').textContent = dateTimeString;
}

// Statistik singkat dihapus dari dashboard; tidak ada perhitungan statistik di sini

// Inisialisasi
displayGreeting();
displayDateTime();

// Update waktu setiap detik
setInterval(displayDateTime, 1000);
