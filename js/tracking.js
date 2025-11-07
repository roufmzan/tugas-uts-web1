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

// Check if DO number is in URL parameter
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const doNumber = urlParams.get('do');
    
    if (doNumber) {
        document.getElementById('doNumber').value = doNumber;
        searchTracking(doNumber);
    }
});

// Form submit handler
document.getElementById('trackingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const doNumber = document.getElementById('doNumber').value.trim();
    
    if (!doNumber) {
        alert('Silakan masukkan nomor Delivery Order!');
        return;
    }
    
    searchTracking(doNumber);
});

// Search tracking function
function searchTracking(doNumber) {
    // Hide previous results
    document.getElementById('trackingResult').style.display = 'none';
    document.getElementById('noDataMessage').style.display = 'none';
    
    // Search in dataTracking
    const tracking = dataTracking.find(t => t.noDO.toLowerCase() === doNumber.toLowerCase());
    
    if (tracking) {
        displayTrackingResult(tracking);
    } else {
        // Show no data message
        document.getElementById('noDataMessage').style.display = 'block';
    }
}

// Display tracking result
function displayTrackingResult(tracking) {
    // Show result section
    document.getElementById('trackingResult').style.display = 'block';
    
    // Fill basic info
    document.getElementById('resultDoNumber').textContent = tracking.noDO;
    document.getElementById('resultCustomerName').textContent = tracking.namaPemesan;
    
    // Set progress bar
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    progressBar.style.width = tracking.progress + '%';
    progressText.textContent = tracking.progress + '%';
    
    // Set progress bar color based on status
    if (tracking.progress === 100) {
        progressBar.classList.remove('warning', 'info');
        progressBar.classList.add('success');
    } else if (tracking.progress >= 50) {
        progressBar.classList.remove('success', 'info');
        progressBar.classList.add('warning');
    } else {
        progressBar.classList.remove('success', 'warning');
        progressBar.classList.add('info');
    }
    
    // Set status text
    document.getElementById('statusText').textContent = tracking.status;
    
    // Fill delivery details
    document.getElementById('resultExpedition').textContent = tracking.ekspedisi;
    document.getElementById('resultShipDate').textContent = formatDate(tracking.tanggalKirim);
    document.getElementById('resultPackageType').textContent = tracking.jenisPaket;
    document.getElementById('resultTotalPayment').textContent = formatRupiah(tracking.totalPembayaran);
    
    // Display timeline
    displayTimeline(tracking.riwayat);
    
    // Scroll to result
    document.getElementById('trackingResult').scrollIntoView({ behavior: 'smooth' });
}

// Display timeline
function displayTimeline(history) {
    const timeline = document.getElementById('trackingTimeline');
    timeline.innerHTML = '';
    
    history.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-date">${formatDateTime(item.tanggal)}</div>
                <div class="timeline-text">${item.keterangan}</div>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
}

// Format date time
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hour}:${minute}`;
}

// Format Rupiah
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}
