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

// Shopping cart
let cart = [];

// Load books to select
function loadBookSelect() {
    const select = document.getElementById('bookSelect');
    
    dataKatalogBuku.forEach(book => {
        const option = document.createElement('option');
        option.value = book.id;
        option.textContent = `${book.judul} - ${formatRupiah(book.harga)} (Stok: ${book.stok})`;
        option.dataset.price = book.harga;
        option.dataset.stock = book.stok;
        option.dataset.title = book.judul;
        select.appendChild(option);
    });
}

// Format Rupiah
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Add to cart
function addToCart() {
    const bookSelect = document.getElementById('bookSelect');
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (!bookSelect.value) {
        alert('Silakan pilih buku terlebih dahulu!');
        return;
    }
    
    if (quantity < 1) {
        alert('Jumlah minimal 1!');
        return;
    }
    
    const selectedOption = bookSelect.options[bookSelect.selectedIndex];
    const bookId = parseInt(bookSelect.value);
    const bookTitle = selectedOption.dataset.title;
    const bookPrice = parseInt(selectedOption.dataset.price);
    const bookStock = parseInt(selectedOption.dataset.stock);
    
    // Check stock
    if (quantity > bookStock) {
        alert(`Stok tidak mencukupi! Stok tersedia: ${bookStock}`);
        return;
    }
    
    // Check if book already in cart
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        // Update quantity
        if (existingItem.quantity + quantity > bookStock) {
            alert(`Total pesanan melebihi stok! Stok tersedia: ${bookStock}`);
            return;
        }
        existingItem.quantity += quantity;
    } else {
        // Add new item
        cart.push({
            id: bookId,
            title: bookTitle,
            price: bookPrice,
            quantity: quantity,
            stock: bookStock
        });
    }
    
    // Reset selection
    bookSelect.value = '';
    document.getElementById('quantity').value = 1;
    
    // Update display
    displayCart();
    calculateTotal();
}

// Display cart
function displayCart() {
    const cartContainer = document.getElementById('cartContainer');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center" style="color: #6b7280;">Keranjang masih kosong</p>';
        return;
    }
    
    let html = '';
    cart.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>${formatRupiah(item.price)} × ${item.quantity} = ${formatRupiah(item.price * item.quantity)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="${item.stock}" 
                               onchange="updateQuantity(${index}, this.value)" readonly>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <button class="btn btn-danger" onclick="removeFromCart(${index})" 
                            style="padding: 8px 16px;">Hapus</button>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
}

// Update quantity
function updateQuantity(index, newQuantity) {
    const quantity = parseInt(newQuantity);
    
    if (quantity < 1) {
        alert('Jumlah minimal 1!');
        return;
    }
    
    if (quantity > cart[index].stock) {
        alert(`Stok tidak mencukupi! Stok tersedia: ${cart[index].stock}`);
        return;
    }
    
    cart[index].quantity = quantity;
    displayCart();
    calculateTotal();
}

// Increase quantity
function increaseQuantity(index) {
    if (cart[index].quantity < cart[index].stock) {
        cart[index].quantity++;
        displayCart();
        calculateTotal();
    } else {
        alert('Stok tidak mencukupi!');
    }
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        displayCart();
        calculateTotal();
    }
}

// Remove from cart
function removeFromCart(index) {
    if (confirm('Hapus item ini dari keranjang?')) {
        cart.splice(index, 1);
        displayCart();
        calculateTotal();
    }
}

// Calculate total
function calculateTotal() {
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('subtotal').textContent = formatRupiah(subtotal);
    
    // Get shipping cost
    const shippingSelect = document.getElementById('shippingMethod');
    const shippingCost = shippingSelect.value ? 
        parseInt(shippingSelect.options[shippingSelect.selectedIndex].dataset.cost) : 0;
    document.getElementById('shippingCost').textContent = formatRupiah(shippingCost);
    
    // Calculate total
    const total = subtotal + shippingCost;
    document.getElementById('totalPayment').textContent = formatRupiah(total);
}

// Process checkout
function processCheckout() {
    // Validate cart
    if (cart.length === 0) {
        alert('Keranjang belanja masih kosong!');
        return;
    }
    
    // Validate customer info
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerCity = document.getElementById('customerCity').value;
    const customerAddress = document.getElementById('customerAddress').value;
    
    if (!customerName || !customerEmail || !customerPhone || !customerCity || !customerAddress) {
        alert('Silakan lengkapi informasi pemesan!');
        return;
    }
    
    // Validate payment info
    const paymentMethod = document.getElementById('paymentMethod').value;
    const shippingMethod = document.getElementById('shippingMethod').value;
    
    if (!paymentMethod) {
        alert('Silakan pilih metode pembayaran!');
        return;
    }
    
    if (!shippingMethod) {
        alert('Silakan pilih metode pengiriman!');
        return;
    }
    
    // Generate order number
    const orderNumber = 'DO' + String(Math.floor(Math.random() * 10000)).padStart(3, '0');
    
    // Get total
    const totalPayment = document.getElementById('totalPayment').textContent;
    
    // Create order data
    const orderData = {
        noDO: orderNumber,
        namaPemesan: customerName,
        email: customerEmail,
        phone: customerPhone,
        city: customerCity,
        address: customerAddress,
        paymentMethod: paymentMethod,
        shippingMethod: shippingMethod,
        items: cart,
        totalPayment: totalPayment,
        orderDate: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Show success message
    alert(`Pesanan berhasil dibuat!\n\nNomor Delivery Order: ${orderNumber}\n\nSilakan lakukan pembayaran dan simpan nomor DO untuk tracking pengiriman.`);
    
    // Reset form and cart
    cart = [];
    document.getElementById('checkoutForm').reset();
    document.getElementById('paymentMethod').value = '';
    document.getElementById('shippingMethod').value = '';
    displayCart();
    calculateTotal();
    
    // Redirect to tracking page
    if (confirm('Apakah Anda ingin melihat status pengiriman?')) {
        window.location.href = 'tracking.html?do=' + orderNumber;
    }
}

// Initialize
loadBookSelect();
displayCart();
calculateTotal();

// Auto-fill customer info from current user
document.getElementById('customerName').value = currentUser.nama;
document.getElementById('customerEmail').value = currentUser.email;

// Support adding from catalog via query params (?add=<bookId>&qty=<n>)
window.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const addId = params.get('add');
    const qtyParam = parseInt(params.get('qty') || '1');
    if (addId) {
        const book = dataKatalogBuku.find(b => b.id === parseInt(addId));
        if (book) {
            const quantity = Math.min(Math.max(1, qtyParam), book.stok);
            const existing = cart.find(i => i.id === book.id);
            if (existing) {
                existing.quantity = Math.min(existing.quantity + quantity, book.stok);
            } else {
                cart.push({
                    id: book.id,
                    title: book.judul,
                    price: book.harga,
                    quantity: quantity,
                    stock: book.stok
                });
            }
            displayCart();
            calculateTotal();
            // Clear params from URL after adding (without reload)
            history.replaceState({}, document.title, window.location.pathname);
        }
    }
});
