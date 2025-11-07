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

// Format Rupiah
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Format date time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    
    return `${dayName}, ${day} ${month} ${year} - ${hour}:${minute}`;
}

// Display history
function displayHistory(transactions = dataTransaksi) {
    const container = document.getElementById('historyContainer');
    container.innerHTML = '';
    
    if (transactions.length === 0) {
        container.innerHTML = '<p class="text-center" style="color: #6b7280;">Tidak ada riwayat transaksi</p>';
        return;
    }
    
    // Sort by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => 
        new Date(b.tanggal) - new Date(a.tanggal)
    );
    
    sortedTransactions.forEach(transaction => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.marginBottom = '15px';
        card.style.cursor = 'pointer';
        card.style.transition = 'all 0.3s';
        
        card.onmouseover = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        };
        
        card.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        };
        
        let statusClass = 'badge-info';
        let statusIcon = '📦';
        if (transaction.status === 'Selesai') {
            statusClass = 'badge-success';
            statusIcon = '✅';
        } else if (transaction.status === 'Proses') {
            statusClass = 'badge-warning';
            statusIcon = '⏳';
        }
        
        card.innerHTML = `
            <div class="d-flex justify-between align-center">
                <div>
                    <h3 style="margin-bottom: 10px;">${statusIcon} ${transaction.id}</h3>
                    <p style="margin-bottom: 5px;"><strong>Pelanggan:</strong> ${transaction.pelanggan}</p>
                    <p style="margin-bottom: 5px;"><strong>Tanggal:</strong> ${formatDateTime(transaction.tanggal)}</p>
                    <p style="margin-bottom: 5px;"><strong>Total Item:</strong> ${transaction.totalItem} item</p>
                </div>
                <div style="text-align: right;">
                    <span class="badge ${statusClass}" style="display: inline-block; margin-bottom: 10px;">
                        ${transaction.status}
                    </span>
                    <h3 style="color: #10b981; margin-bottom: 10px;">${formatRupiah(transaction.totalBayar)}</h3>
                    <button class="btn btn-primary" onclick="showDetail('${transaction.id}')" style="padding: 8px 16px;">
                        Detail
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Search history
function searchHistory() {
    const searchQuery = document.getElementById('searchHistory').value.toLowerCase();
    
    const filtered = dataTransaksi.filter(transaction => 
        transaction.id.toLowerCase().includes(searchQuery) ||
        transaction.pelanggan.toLowerCase().includes(searchQuery)
    );
    
    displayHistory(filtered);
}

// Show detail modal
function showDetail(transactionId) {
    const transaction = dataTransaksi.find(t => t.id === transactionId);
    
    if (!transaction) {
        alert('Transaksi tidak ditemukan!');
        return;
    }
    
    let statusClass = 'alert-info';
    if (transaction.status === 'Selesai') {
        statusClass = 'alert-success';
    } else if (transaction.status === 'Proses') {
        statusClass = 'alert-info';
    }
    
    const detailContent = document.getElementById('detailContent');
    detailContent.innerHTML = `
        <div class="alert ${statusClass}">
            <strong>Status:</strong> ${transaction.status}
        </div>
        
        <div style="margin-top: 20px;">
            <h3>Informasi Transaksi</h3>
            <table style="width: 100%; margin-top: 10px;">
                <tr>
                    <td style="padding: 8px 0;"><strong>ID Transaksi:</strong></td>
                    <td style="padding: 8px 0;">${transaction.id}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Tanggal:</strong></td>
                    <td style="padding: 8px 0;">${formatDateTime(transaction.tanggal)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Pelanggan:</strong></td>
                    <td style="padding: 8px 0;">${transaction.pelanggan}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Total Item:</strong></td>
                    <td style="padding: 8px 0;">${transaction.totalItem} item</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Total Pembayaran:</strong></td>
                    <td style="padding: 8px 0; color: #10b981; font-weight: 600; font-size: 18px;">
                        ${formatRupiah(transaction.totalBayar)}
                    </td>
                </tr>
            </table>
        </div>
        
        <div style="margin-top: 20px;">
            <p style="color: #6b7280; font-size: 14px;">
                💡 Untuk melihat detail pengiriman, silakan gunakan menu Tracking Pengiriman.
            </p>
        </div>
    `;
    
    document.getElementById('detailModal').classList.add('active');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// Initialize
displayHistory();
