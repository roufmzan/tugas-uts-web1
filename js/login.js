// Fungsi untuk mendapatkan semua user (dari data.js + localStorage)
function getAllUsers() {
    // Ambil user terdaftar dari localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Gabungkan dengan dataUser dari data.js
    return [...dataUser, ...registeredUsers];
}

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validasi login dengan data dari data.js dan localStorage
    const allUsers = getAllUsers();
    const user = allUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Simpan data user ke localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Alert sukses
        alert('Login berhasil! Selamat datang, ' + user.nama);
        
        // Redirect ke dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Alert gagal
        alert('Email atau password yang Anda masukkan salah!');
    }
});

// Forgot Password Button
document.getElementById('forgotPasswordBtn').addEventListener('click', function(e) {
    e.preventDefault();
    openModal('forgotPasswordModal');
});

// Register Button
document.getElementById('registerBtn').addEventListener('click', function(e) {
    e.preventDefault();
    openModal('registerModal');
});

// Forgot Password Form
document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    // Cek apakah email terdaftar (dari semua user)
    const allUsers = getAllUsers();
    const userExists = allUsers.find(u => u.email === email);
    
    if (userExists) {
        alert('Link reset password telah dikirim ke email Anda!');
        closeModal('forgotPasswordModal');
        document.getElementById('forgotPasswordForm').reset();
    } else {
        alert('Email tidak terdaftar!');
    }
});

// Register Form
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // Validasi nama
    if (name.length < 3) {
        alert('Nama minimal 3 karakter!');
        return;
    }
    
    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }
    
    // Validasi password
    if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok!');
        return;
    }
    
    // Validasi panjang password
    if (password.length < 6) {
        alert('Password minimal 6 karakter!');
        return;
    }
    
    // Cek apakah email sudah terdaftar (dari semua user)
    const allUsers = getAllUsers();
    const emailExists = allUsers.find(u => u.email === email);
    
    if (emailExists) {
        alert('Email sudah terdaftar! Silakan gunakan email lain.');
        return;
    }
    
    // Ambil user yang sudah terdaftar dari localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Buat user baru dengan ID auto-increment
    const newId = allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1;
    const newUser = {
        id: newId,
        nama: name,
        email: email,
        password: password
    };
    
    // Tambahkan user baru ke array
    registeredUsers.push(newUser);
    
    // Simpan ke localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // Alert berhasil
    alert('Pendaftaran berhasil! Silakan login dengan akun Anda.\n\nEmail: ' + email);
    
    // Tutup modal dan reset form
    closeModal('registerModal');
    document.getElementById('registerForm').reset();
    
    // Auto-fill email di form login
    document.getElementById('email').value = email;
});

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}
