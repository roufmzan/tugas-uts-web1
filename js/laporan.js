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

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Display orders
function displayOrders(orders = dataTransaksi) {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada data pesanan</td></tr>';
        return;
    }
    
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        
        let statusClass = 'badge-info';
        if (order.status === 'Selesai') {
            statusClass = 'badge-success';
        } else if (order.status === 'Proses') {
            statusClass = 'badge-warning';
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${order.id}</strong></td>
            <td>${formatDate(order.tanggal)}</td>
            <td>${order.pelanggan}</td>
            <td>${order.totalItem}</td>
            <td>${formatRupiah(order.totalBayar)}</td>
            <td><span class="badge ${statusClass}">${order.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Filter orders
function filterOrders() {
    const statusFilter = document.getElementById('filterStatus').value;
    const searchQuery = document.getElementById('searchOrder').value.toLowerCase();
    
    let filtered = dataTransaksi;
    
    // Filter by status
    if (statusFilter) {
        filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter(order => 
            order.id.toLowerCase().includes(searchQuery) ||
            order.pelanggan.toLowerCase().includes(searchQuery)
        );
    }
    
    displayOrders(filtered);
}

// Calculate and display statistics
function displayStatistics() {
    // Total transactions
    document.getElementById('totalTransactions').textContent = dataTransaksi.length;
    
    // Completed orders
    const completedOrders = dataTransaksi.filter(order => order.status === 'Selesai').length;
    document.getElementById('completedOrders').textContent = completedOrders;
    
    // Processing orders
    const processingOrders = dataTransaksi.filter(order => order.status === 'Proses').length;
    document.getElementById('processingOrders').textContent = processingOrders;
    
    // Total revenue (only from completed orders)
    const totalRevenue = dataTransaksi
        .filter(order => order.status === 'Selesai')
        .reduce((sum, order) => sum + order.totalBayar, 0);
    document.getElementById('totalRevenue').textContent = formatRupiah(totalRevenue);
}

// Initialize
displayOrders();
displayStatistics();
