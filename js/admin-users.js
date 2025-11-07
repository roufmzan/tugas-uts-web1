// Fungsi untuk mendapatkan user terdaftar dari localStorage
function getRegisteredUsers() {
    return JSON.parse(localStorage.getItem('registeredUsers')) || [];
}

// Fungsi untuk menampilkan user default
function displayDefaultUsers() {
    const tbody = document.getElementById('defaultUsersTable');
    tbody.innerHTML = '';
    
    dataUser.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nama}</td>
            <td>${user.email}</td>
            <td>${'•'.repeat(user.password.length)}</td>
            <td><span class="badge badge-info">Default (data.js)</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Fungsi untuk menampilkan user terdaftar
function displayRegisteredUsers() {
    const tbody = document.getElementById('registeredUsersTable');
    tbody.innerHTML = '';
    
    const registeredUsers = getRegisteredUsers();
    
    if (registeredUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="color: #6b7280;">Belum ada user yang terdaftar via form registrasi</td></tr>';
        return;
    }
    
    registeredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nama}</td>
            <td>${user.email}</td>
            <td>${'•'.repeat(user.password.length)}</td>
            <td><span class="badge badge-success">Registered (localStorage)</span></td>
            <td>
                <button class="btn btn-danger" onclick="deleteUser('${user.email}')" style="padding: 6px 12px;">
                    Hapus
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Fungsi untuk menampilkan statistik
function displayStatistics() {
    const defaultCount = dataUser.length;
    const registeredCount = getRegisteredUsers().length;
    const totalCount = defaultCount + registeredCount;
    
    document.getElementById('totalDefaultUsers').textContent = defaultCount;
    document.getElementById('totalRegisteredUsers').textContent = registeredCount;
    document.getElementById('totalAllUsers').textContent = totalCount;
}

// Fungsi untuk menghapus user terdaftar
function deleteUser(email) {
    if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) {
        return;
    }
    
    let registeredUsers = getRegisteredUsers();
    registeredUsers = registeredUsers.filter(user => user.email !== email);
    
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    alert('User berhasil dihapus!');
    refreshUserList();
}

// Fungsi untuk menghapus semua user terdaftar
function clearRegisteredUsers() {
    const registeredCount = getRegisteredUsers().length;
    
    if (registeredCount === 0) {
        alert('Tidak ada user terdaftar untuk dihapus!');
        return;
    }
    
    if (!confirm(`Apakah Anda yakin ingin menghapus ${registeredCount} user terdaftar?\n\nUser default tidak akan terhapus.`)) {
        return;
    }
    
    localStorage.removeItem('registeredUsers');
    
    alert('Semua user terdaftar telah dihapus!');
    refreshUserList();
}

// Fungsi untuk refresh tampilan
function refreshUserList() {
    displayDefaultUsers();
    displayRegisteredUsers();
    displayStatistics();
}

// Inisialisasi
refreshUserList();

// Auto refresh setiap 5 detik (untuk melihat perubahan real-time)
setInterval(refreshUserList, 5000);
