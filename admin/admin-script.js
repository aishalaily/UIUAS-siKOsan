let adminUsers = [];
let adminArticles = [];
let adminProducts = [];
let adminTransactions = [];
let currentPage = 1;
let itemsPerPage = 10;
let currentEditId = null;

const sampleUsers = [
    {
        id: 1,
        name: "Aisha",
        email: "aisha@siKOsan.com",
        phone: "083830912273",
        role: "admin",
        status: "active",
        joinDate: "2024-01-15",
        lastLogin: "2024-01-20",
        totalOrders: 0,
        address: "Kantor Pusat",
        city: "Jakarta"
    },
    {
        id: 2,
        name: "Admin User",
        email: "admin@siKOsan.com",
        phone: "081234567892",
        role: "admin",
        status: "active",
        joinDate: "2023-12-01",
        lastLogin: "2024-01-21",
        totalOrders: 0,
        address: "Kantor Pusat",
        city: "Jakarta"
    }
];

const articles = [
    {
        id: 1,
        title: "Cara Memilih Sabun Mandi yang Tepat",
        category: "Mandi",
        excerpt: "Tips memilih sabun mandi yang sesuai dengan jenis kulit Anda.",
        image: "https://i.pinimg.com/736x/c2/2f/c6/c22fc62b40b868dd2b9dbe421f1d61bc.jpg",
        readTime: "5 min",
        status: "published",
        content: "Ini adalah contoh konten artikel.",
        date: "2024-01-25",
        views: 150
    },
    {
        id: 2,
        title: "Tips Mencuci Pakaian Agar Tidak Luntur",
        category: "Cuci",
        excerpt: "Panduan lengkap mencuci pakaian berwarna agar tetap cerah.",
        image: "https://i.pinimg.com/736x/ab/10/1c/ab101c8938998652b296fcbcd004bce0.jpg",
        readTime: "7 min",
        status: "draft",
        content: "Ini adalah contoh konten artikel.",
        date: "2024-01-20",
        views: 80
    }
];

const products = [
    {
        id: 1,
        name: "Sabun Mandi Lavender",
        category: "Mandi",
        description: "Sabun mandi dengan aroma lavender yang menenangkan.",
        price: 15000,
        originalPrice: 20000,
        stock: 50,
        image: "/images/product1.jpg",
        status: "active",
        rating: 4.5,
        reviews: 25,
        specifications: {
            berat: "100gr",
            aroma: "Lavender",
            jenisKulit: "Semua jenis kulit"
        }
    },
    {
        id: 2,
        name: "Deterjen Bubuk Anti Noda",
        category: "Cuci",
        description: "Deterjen bubuk yang efektif menghilangkan noda membandel.",
        price: 25000,
        originalPrice: 30000,
        stock: 30,
        image: "/images/product2.jpg",
        status: "inactive",
        rating: 4.2,
        reviews: 18,
        specifications: {
            berat: "500gr",
            jenisPakaian: "Semua jenis pakaian",
            keunggulan: "Anti noda"
        }
    }
];

const orders = [
    {
        id: "ORD-20240127-001",
        userId: 1,
        items: [
            { name: "Sabun Mandi Lavender", price: 15000, quantity: 2 },
            { name: "Deterjen Bubuk Anti Noda", price: 25000, quantity: 1 }
        ],
        total: 55000,
        shipping: 10000,
        payment: "Credit Card",
        status: "pending",
        date: "2024-01-27",
        address: "Jl. Sudirman No. 123, Jakarta"
    },
    {
        id: "ORD-20240126-002",
        userId: 2,
        items: [
            { name: "Sabun Mandi Lavender", price: 15000, quantity: 1 }
        ],
        total: 15000,
        shipping: 8000,
        payment: "COD",
        status: "shipped",
        date: "2024-01-26",
        address: "Jl. Thamrin No. 456, Jakarta",
        trackingNumber: "JNE1234567890"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeAdminData();
    loadCurrentPage();
    setupAdminEventListeners();
});

function initializeAdminData() {
    adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || sampleUsers;
    adminArticles = JSON.parse(localStorage.getItem('adminArticles')) || articles;
    adminProducts = JSON.parse(localStorage.getItem('adminProducts')) || products;
    adminTransactions = JSON.parse(localStorage.getItem('adminTransactions')) || orders;
    
    if (!localStorage.getItem('adminUsers')) {
        localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
    }
    if (!localStorage.getItem('adminArticles')) {
        localStorage.setItem('adminArticles', JSON.stringify(adminArticles));
    }
    if (!localStorage.getItem('adminProducts')) {
        localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
    }
    if (!localStorage.getItem('adminTransactions')) {
        localStorage.setItem('adminTransactions', JSON.stringify(adminTransactions));
    }
}

function loadCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'dashboard.html':
            loadDashboard();
            break;
        case 'kelola-artikel.html':
            loadArticlesAdmin();
            break;
        case 'kelola-produk.html':
            loadProductsAdmin();
            break;
        case 'kelola-pengguna.html':
            loadUsersAdmin();
            break;
        case 'kelola-transaksi.html':
            loadTransactionsAdmin();
            break;
    }
}

function setupAdminEventListeners() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

function loadDashboard() {
    updateDashboardStats();
    loadRecentOrders();
    loadRecentArticles();
    initializeCharts();
}

function updateDashboardStats() {
    document.getElementById('total-orders').textContent = adminTransactions.length;
    document.getElementById('total-products').textContent = adminProducts.length;
    document.getElementById('total-users').textContent = adminUsers.filter(u => u.role === 'customer').length;
    
    const totalRevenue = adminTransactions.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('total-revenue').textContent = `Rp ${totalRevenue.toLocaleString()}`;
}

function loadRecentOrders() {
    const container = document.getElementById('recent-orders-table');
    if (!container) return;
    
    const recentOrders = adminTransactions.slice(0, 5);
    container.innerHTML = recentOrders.map(order => {
        const user = adminUsers.find(u => u.id === order.userId) || { name: 'Unknown User' };
        return `
            <tr>
                <td>${order.id}</td>
                <td>${user.name}</td>
                <td>Rp ${order.total.toLocaleString()}</td>
                <td><span class="status-badge status-${order.status}">${getOrderStatusName(order.status)}</span></td>
                <td>${formatDate(order.date)}</td>
            </tr>
        `;
    }).join('');
}

function loadRecentArticles() {
    const container = document.getElementById('recent-articles-list');
    if (!container) return;
    
    const recentArticles = adminArticles.slice(0, 5);
    container.innerHTML = recentArticles.map(article => `
        <div class="article-item">
            <h4>${article.title}</h4>
            <p>${getCategoryName(article.category)} • ${formatDate(article.date)}</p>
        </div>
    `).join('');
}

function initializeCharts() {
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Penjualan',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Mandi', 'Cuci', 'Kebersihan', 'Alat Tulis'],
                datasets: [{
                    data: [30, 25, 20, 25],
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function loadArticlesAdmin() {
    displayArticlesTable();
    setupArticleEventListeners();
}

function displayArticlesTable() {
    const container = document.getElementById('articles-table-body');
    if (!container) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArticles = adminArticles.slice(startIndex, endIndex);
    
    container.innerHTML = paginatedArticles.map(article => `
        <tr>
            <td><input type="checkbox" class="article-checkbox" value="${article.id}"></td>
            <td><img src="${article.image}" alt="${article.title}"></td>
            <td>${article.title}</td>
            <td>${getCategoryName(article.category)}</td>
            <td><span class="status-badge status-${article.status || 'published'}">${article.status || 'Published'}</span></td>
            <td>${formatDate(article.date)}</td>
            <td>${article.views || 0}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-info btn-small" onclick="editArticle(${article.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteArticle(${article.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    updatePagination('articles');
}

function setupArticleEventListeners() {
    const articleForm = document.getElementById('article-form');
    if (articleForm) {
        articleForm.addEventListener('submit', handleArticleSubmit);
    }
    
    const imageInput = document.getElementById('article-image');
    if (imageInput) {
        imageInput.addEventListener('input', previewArticleImage);
    }
}

function showAddArticleModal() {
    currentEditId = null;
    document.getElementById('article-modal-title').textContent = 'Tambah Artikel';
    document.getElementById('article-form').reset();
    document.getElementById('article-modal').classList.add('active');
}

function editArticle(id) {
    const article = adminArticles.find(a => a.id === id);
    if (!article) return;
    
    currentEditId = id;
    document.getElementById('article-modal-title').textContent = 'Edit Artikel';
    document.getElementById('article-id').value = article.id;
    document.getElementById('article-title').value = article.title;
    document.getElementById('article-category').value = article.category;
    document.getElementById('article-excerpt').value = article.excerpt;
    document.getElementById('article-image').value = article.image;
    document.getElementById('article-read-time').value = article.readTime.replace(' min', '');
    document.getElementById('article-status').value = article.status || 'published';
    document.getElementById('article-content').value = article.content;
    
    previewArticleImage();
    document.getElementById('article-modal').classList.add('active');
}

function handleArticleSubmit(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('article-title').value,
        category: document.getElementById('article-category').value,
        excerpt: document.getElementById('article-excerpt').value,
        image: document.getElementById('article-image').value,
        readTime: document.getElementById('article-read-time').value + ' min',
        status: document.getElementById('article-status').value,
        content: document.getElementById('article-content').value,
        date: new Date().toISOString().slice(0, 10)
    };
    
    if (currentEditId) {
        const index = adminArticles.findIndex(a => a.id === currentEditId);
        adminArticles[index] = { ...adminArticles[index], ...formData };
    } else {
        const newArticle = {
            id: Date.now(),
            ...formData,
            views: 0
        };
        adminArticles.push(newArticle);
    }
    
    localStorage.setItem('adminArticles', JSON.stringify(adminArticles));
    displayArticlesTable();
    closeArticleModal();
    showNotification('Artikel berhasil disimpan!', 'success');
}

function deleteArticle(id) {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
        adminArticles = adminArticles.filter(a => a.id !== id);
        localStorage.setItem('adminArticles', JSON.stringify(adminArticles));
        displayArticlesTable();
        showNotification('Artikel berhasil dihapus!', 'success');
    }
}

function closeArticleModal() {
    document.getElementById('article-modal').classList.remove('active');
}

function previewArticleImage() {
    const imageUrl = document.getElementById('article-image').value;
    const preview = document.getElementById('article-image-preview');
    
    if (imageUrl) {
        preview.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
    } else {
        preview.innerHTML = '';
    }
}

function loadProductsAdmin() {
    displayProductsTable();
    setupProductEventListeners();
}

function displayProductsTable() {
    const container = document.getElementById('products-table-body');
    if (!container) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = adminProducts.slice(startIndex, endIndex);
    
    container.innerHTML = paginatedProducts.map(product => `
        <tr>
            <td><input type="checkbox" class="product-checkbox" value="${product.id}"></td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>Rp ${product.price.toLocaleString()}</td>
            <td>${product.stock}</td>
            <td>${product.rating}/5</td>
            <td><span class="status-badge status-${product.status || 'active'}">${product.status || 'Active'}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-info btn-small" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    updatePagination('products');
}

function setupProductEventListeners() {
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
    
    const imageInput = document.getElementById('product-image');
    if (imageInput) {
        imageInput.addEventListener('input', previewProductImage);
    }
}

function showAddProductModal() {
    currentEditId = null;
    document.getElementById('product-modal-title').textContent = 'Tambah Produk';
    document.getElementById('product-form').reset();
    document.getElementById('product-modal').classList.add('active');
}

function editProduct(id) {
    const product = adminProducts.find(p => p.id === id);
    if (!product) return;
    
    currentEditId = id;
    document.getElementById('product-modal-title').textContent = 'Edit Produk';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-original-price').value = product.originalPrice;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-image').value = product.image;
    document.getElementById('product-status').value = product.status || 'active';
    
    previewProductImage();
    loadProductSpecifications(product.specifications);
    document.getElementById('product-modal').classList.add('active');
}

function handleProductSubmit(e) {
    e.preventDefault();
    
    const specifications = {};
    document.querySelectorAll('.specification-row').forEach(row => {
        const name = row.querySelector('.spec-name').value;
        const value = row.querySelector('.spec-value').value;
        if (name && value) {
            specifications[name] = value;
        }
    });
    
    const formData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        description: document.getElementById('product-description').value,
        price: parseInt(document.getElementById('product-price').value),
        originalPrice: parseInt(document.getElementById('product-original-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        image: document.getElementById('product-image').value,
        status: document.getElementById('product-status').value,
        specifications: specifications
    };
    
    if (currentEditId) {
        const index = adminProducts.findIndex(p => p.id === currentEditId);
        adminProducts[index] = { ...adminProducts[index], ...formData };
    } else {
        const newProduct = {
            id: Date.now(),
            ...formData,
            rating: 0,
            reviews: 0
        };
        adminProducts.push(newProduct);
    }
    
    localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
    displayProductsTable();
    closeProductModal();
    showNotification('Produk berhasil disimpan!', 'success');
}

function deleteProduct(id) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        adminProducts = adminProducts.filter(p => p.id !== id);
        localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
        displayProductsTable();
        showNotification('Produk berhasil dihapus!', 'success');
    }
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

function previewProductImage() {
    const imageUrl = document.getElementById('product-image').value;
    const preview = document.getElementById('product-image-preview');
    
    if (imageUrl) {
        preview.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
    } else {
        preview.innerHTML = '';
    }
}

function addSpecification() {
    const container = document.getElementById('specifications-container');
    const newRow = document.createElement('div');
    newRow.className = 'specification-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Nama spesifikasi" class="spec-name">
        <input type="text" placeholder="Nilai spesifikasi" class="spec-value">
        <button type="button" onclick="removeSpecification(this)" class="btn btn-danger btn-small">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(newRow);
}

function removeSpecification(button) {
    button.parentElement.remove();
}

function loadUsersAdmin() {
    updateUserStats();
    displayUsersTable();
    setupUserEventListeners();
}

function updateUserStats() {
    const totalUsers = adminUsers.filter(u => u.role === 'customer').length;
    const activeUsers = adminUsers.filter(u => u.status === 'active' && u.role === 'customer').length;
    const adminUsersCount = adminUsers.filter(u => u.role === 'admin').length;
    
    document.getElementById('total-users-count').textContent = totalUsers;
    document.getElementById('active-users-count').textContent = activeUsers;
    document.getElementById('admin-users-count').textContent = adminUsersCount;
    document.getElementById('new-users-count').textContent = '5'; 
}

function displayUsersTable() {
    const container = document.getElementById('users-table-body');
    if (!container) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = adminUsers.slice(startIndex, endIndex);
    
    container.innerHTML = paginatedUsers.map(user => `
        <tr>
            <td><input type="checkbox" class="user-checkbox" value="${user.id}"></td>
            <td><img src="/placeholder.svg?height=40&width=40" alt="Avatar"></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="status-badge status-${user.role}">${user.role}</span></td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>${formatDate(user.joinDate)}</td>
            <td>${formatDate(user.lastLogin)}</td>
            <td>${user.totalOrders}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-info btn-small" onclick="viewUser(${user.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-warning btn-small" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    updatePagination('users');
}

function setupUserEventListeners() {
    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', handleUserSubmit);
    }
}

function showAddUserModal() {
    currentEditId = null;
    document.getElementById('user-modal-title').textContent = 'Tambah Pengguna';
    document.getElementById('user-form').reset();
    document.getElementById('password-group').style.display = 'block';
    document.getElementById('user-password').required = true;
    document.getElementById('user-modal').classList.add('active');
}

function editUser(id) {
    const user = adminUsers.find(u => u.id === id);
    if (!user) return;
    
    currentEditId = id;
    document.getElementById('user-modal-title').textContent = 'Edit Pengguna';
    document.getElementById('user-id').value = user.id;
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-phone').value = user.phone;
    document.getElementById('user-role').value = user.role;
    document.getElementById('user-address').value = user.address;
    document.getElementById('user-city').value = user.city;
    document.getElementById('user-status').value = user.status;
    
    document.getElementById('password-group').style.display = 'none';
    document.getElementById('user-password').required = false;
    document.getElementById('user-modal').classList.add('active');
}

function handleUserSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('user-name').value,
        email: document.getElementById('user-email').value,
        phone: document.getElementById('user-phone').value,
        role: document.getElementById('user-role').value,
        address: document.getElementById('user-address').value,
        city: document.getElementById('user-city').value,
        status: document.getElementById('user-status').value
    };
    
    if (currentEditId) {
        const index = adminUsers.findIndex(u => u.id === currentEditId);
        adminUsers[index] = { ...adminUsers[index], ...formData };
    } else {
        const newUser = {
            id: Date.now(),
            ...formData,
            joinDate: new Date().toISOString().slice(0, 10),
            lastLogin: new Date().toISOString().slice(0, 10),
            totalOrders: 0
        };
        adminUsers.push(newUser);
    }
    
    localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
    displayUsersTable();
    updateUserStats();
    closeUserModal();
    showNotification('Pengguna berhasil disimpan!', 'success');
}

function deleteUser(id) {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
        adminUsers = adminUsers.filter(u => u.id !== id);
        localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
        displayUsersTable();
        updateUserStats();
        showNotification('Pengguna berhasil dihapus!', 'success');
    }
}

function closeUserModal() {
    document.getElementById('user-modal').classList.remove('active');
}

function loadTransactionsAdmin() {
    updateTransactionStats();
    displayTransactionsTable();
    setupTransactionEventListeners();
}

function updateTransactionStats() {
    const totalTransactions = adminTransactions.length;
    const totalRevenue = adminTransactions.reduce((sum, t) => sum + t.total, 0);
    const pendingOrders = adminTransactions.filter(t => t.status === 'pending').length;
    const shippingOrders = adminTransactions.filter(t => t.status === 'shipped').length;
    
    document.getElementById('total-transactions').textContent = totalTransactions;
    document.getElementById('total-revenue').textContent = `Rp ${totalRevenue.toLocaleString()}`;
    document.getElementById('pending-orders').textContent = pendingOrders;
    document.getElementById('shipping-orders').textContent = shippingOrders;
}

function displayTransactionsTable() {
    const container = document.getElementById('transactions-table-body');
    if (!container) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransactions = adminTransactions.slice(startIndex, endIndex);
    
    container.innerHTML = paginatedTransactions.map(transaction => {
        const user = adminUsers.find(u => u.id === transaction.userId) || { name: 'Unknown User' };
        const itemsCount = transaction.items.length;
        const firstItem = transaction.items[0];
        
        return `
            <tr>
                <td><input type="checkbox" class="transaction-checkbox" value="${transaction.id}"></td>
                <td>${transaction.id}</td>
                <td>${user.name}</td>
                <td>${firstItem.name}${itemsCount > 1 ? ` +${itemsCount - 1} lainnya` : ''}</td>
                <td>Rp ${transaction.total.toLocaleString()}</td>
                <td>${transaction.payment || 'COD'}</td>
                <td><span class="status-badge status-${transaction.status}">${getOrderStatusName(transaction.status)}</span></td>
                <td>${formatDate(transaction.date)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-info btn-small" onclick="viewTransaction(${transaction.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-warning btn-small" onclick="updateTransactionStatus('${transaction.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    updatePagination('transactions');
}

function setupTransactionEventListeners() {
    const updateStatusForm = document.getElementById('update-status-form');
    if (updateStatusForm) {
        updateStatusForm.addEventListener('submit', handleStatusUpdate);
    }
    
    const newStatusSelect = document.getElementById('new-status');
    if (newStatusSelect) {
        newStatusSelect.addEventListener('change', toggleTrackingField);
    }
}

function viewTransaction(id) {
    const transaction = adminTransactions.find(t => t.id === id);
    if (!transaction) return;
    
    const user = adminUsers.find(u => u.id === transaction.userId) || { name: 'Unknown User', email: 'unknown@email.com' };
    
    const content = `
        <div class="transaction-detail">
            <h4>Informasi Pesanan</h4>
            <p><strong>ID Pesanan:</strong> ${transaction.id}</p>
            <p><strong>Tanggal:</strong> ${formatDate(transaction.date)}</p>
            <p><strong>Status:</strong> <span class="status-badge status-${transaction.status}">${getOrderStatusName(transaction.status)}</span></p>
            
            <h4>Informasi Pelanggan</h4>
            <p><strong>Nama:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Alamat:</strong> ${transaction.address}</p>
            
            <h4>Detail Produk</h4>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Produk</th>
                        <th>Harga</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${transaction.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>Rp ${item.price.toLocaleString()}</td>
                            <td>${item.quantity}</td>
                            <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <h4>Ringkasan Pembayaran</h4>
            <p><strong>Subtotal:</strong> Rp ${transaction.total.toLocaleString()}</p>
            <p><strong>Ongkir:</strong> Rp ${transaction.shipping.toLocaleString()}</p>
            <p><strong>Total:</strong> Rp ${(transaction.total + transaction.shipping).toLocaleString()}</p>
        </div>
    `;
    
    document.getElementById('transaction-detail-content').innerHTML = content;
    document.getElementById('transaction-detail-modal').classList.add('active');
}

function updateTransactionStatus(id) {
    currentEditId = id;
    const transaction = adminTransactions.find(t => t.id === id);
    if (!transaction) return;
    
    document.getElementById('update-order-id').value = id;
    document.getElementById('new-status').value = transaction.status;
    document.getElementById('update-status-modal').classList.add('active');
}

function handleStatusUpdate(e) {
    e.preventDefault();
    
    const orderId = document.getElementById('update-order-id').value;
    const newStatus = document.getElementById('new-status').value;
    const trackingNumber = document.getElementById('tracking-number').value;
    const notes = document.getElementById('status-notes').value;
    const notifyCustomer = document.getElementById('notify-customer').checked;
    
    const transactionIndex = adminTransactions.findIndex(t => t.id === orderId);
    if (transactionIndex !== -1) {
        adminTransactions[transactionIndex].status = newStatus;
        if (trackingNumber) {
            adminTransactions[transactionIndex].trackingNumber = trackingNumber;
        }
        if (notes) {
            adminTransactions[transactionIndex].notes = notes;
        }
        
        localStorage.setItem('adminTransactions', JSON.stringify(adminTransactions));
        displayTransactionsTable();
        updateTransactionStats();
        closeUpdateStatusModal();
        
        if (notifyCustomer) {
            showNotification('Status pesanan berhasil diupdate dan notifikasi dikirim!', 'success');
        } else {
            showNotification('Status pesanan berhasil diupdate!', 'success');
        }
    }
}

function toggleTrackingField() {
    const status = document.getElementById('new-status').value;
    const trackingGroup = document.getElementById('tracking-group');
    
    if (status === 'shipped') {
        trackingGroup.style.display = 'block';
    } else {
        trackingGroup.style.display = 'none';
    }
}

function closeTransactionDetailModal() {
    document.getElementById('transaction-detail-modal').classList.remove('active');
}

function closeUpdateStatusModal() {
    document.getElementById('update-status-modal').classList.remove('active');
}

function updatePagination(type) {
    const container = document.getElementById(`${type}-pagination`);
    if (!container) return;
    
    let totalItems;
    switch(type) {
        case 'articles': totalItems = adminArticles.length; break;
        case 'products': totalItems = adminProducts.length; break;
        case 'users': totalItems = adminUsers.length; break;
        case 'transactions': totalItems = adminTransactions.length; break;
        default: totalItems = 0;
    }
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    let paginationHTML = '';
    
    paginationHTML += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1}, '${type}')">Previous</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i}, '${type}')">${i}</button>`;
    }
    
    paginationHTML += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1}, '${type}')">Next</button>`;
    
    container.innerHTML = paginationHTML;
}

function changePage(page, type) {
    currentPage = page;
    
    switch(type) {
        case 'articles': displayArticlesTable(); break;
        case 'products': displayProductsTable(); break;
        case 'users': displayUsersTable(); break;
        case 'transactions': displayTransactionsTable(); break;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function exportData() {
    showNotification('Fitur export sedang dalam pengembangan', 'info');
}

function generateReport() {
    showNotification('Fitur generate report sedang dalam pengembangan', 'info');
}

function searchArticles() {
    const searchTerm = document.getElementById('article-search').value.toLowerCase();
    const filteredArticles = adminArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm)
    );
    displayFilteredArticles(filteredArticles);
}

function searchProducts() {
    const searchTerm = document.getElementById('product-search').value.toLowerCase();
    const filteredProducts = adminProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    displayFilteredProducts(filteredProducts);
}

function searchUsers() {
    const searchTerm = document.getElementById('user-search').value.toLowerCase();
    const filteredUsers = adminUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    displayFilteredUsers(filteredUsers);
}

function searchTransactions() {
    const searchTerm = document.getElementById('transaction-search').value.toLowerCase();
    const filteredTransactions = adminTransactions.filter(transaction => {
        const user = adminUsers.find(u => u.id === transaction.userId) || { name: '' };
        return transaction.id.toLowerCase().includes(searchTerm) ||
               user.name.toLowerCase().includes(searchTerm);
    });
    displayFilteredTransactions(filteredTransactions);
}

function toggleSelectAll(type) {
    const selectAllCheckbox = document.getElementById(`select-all-${type}`);
    const checkboxes = document.querySelectorAll(`.${type.slice(0, -1)}-checkbox`);
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    
    updateBulkActions(type);
}

function updateBulkActions(type) {
    const checkboxes = document.querySelectorAll(`.${type.slice(0, -1)}-checkbox:checked`);
    const bulkActions = document.getElementById(`bulk-actions-${type}`);
    const selectedCount = document.getElementById(`selected-count-${type}`);
    
    if (checkboxes.length > 0) {
        bulkActions.style.display = 'flex';
        selectedCount.textContent = `${checkboxes.length} ${type.slice(0, -1)} dipilih`;
    } else {
        bulkActions.style.display = 'none';
    }
}

document.addEventListener('change', function(e) {
    if (e.target.classList.contains('article-checkbox')) {
        updateBulkActions('articles');
    } else if (e.target.classList.contains('product-checkbox')) {
        updateBulkActions('products');
    } else if (e.target.classList.contains('user-checkbox')) {
        updateBulkActions('users');
    } else if (e.target.classList.contains('transaction-checkbox')) {
        updateBulkActions('transactions');
    }
});

function displayFilteredArticles(filteredArticles) {
    const container = document.getElementById('articles-table-body');
    if (!container) return;

    container.innerHTML = filteredArticles.map(article => `
        <tr>
            <td><input type="checkbox" class="article-checkbox" value="${article.id}"></td>
            <td><img src="${article.image}" alt="${article.title}"></td>
            <td>${article.title}</td>
            <td>${getCategoryName(article.category)}</td>
            <td><span class="status-badge status-${article.status || 'published'}">${article.status || 'Published'}</span></td>
            <td>${formatDate(article.date)}</td>
            <td>${article.views || 0}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-info btn-small" onclick="editArticle(${article.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteArticle(${article.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function displayFilteredProducts(filteredProducts) {
    const container = document.getElementById('products-table-body');
    if (!container) return;

    container.innerHTML = filteredProducts.map(product => `
        <tr>
            <td><input type="checkbox" class="product-checkbox" value="${product.id}"></td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>Rp ${product.price.toLocaleString()}</td>
            <td>${product.stock}</td>
            <td>${product.rating}/5</td>
            <td><span class="status-badge status-${product.status || 'active'}">${product.status || 'Active'}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-info btn-small" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function displayFilteredUsers(filteredUsers) {
    const container = document.getElementById('users-table-body');
    if (!container) return;

    container.innerHTML = filteredUsers.map(user => `
        <tr>
            <td><input type="checkbox" class="user-checkbox" value="${user.id}"></td>
            <td><img src="/placeholder.svg?height=40&width=40" alt="Avatar"></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="status-badge status-${user.role}">${user.role}</span></td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>${formatDate(user.joinDate)}</td>
            <td>${formatDate(user.lastLogin)}</td>
            <td>${user.totalOrders}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-info btn-small" onclick="viewUser(${user.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-warning btn-small" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function displayFilteredTransactions(filteredTransactions) {
    const container = document.getElementById('transactions-table-body');
    if (!container) return;

    container.innerHTML = filteredTransactions.map(transaction => {
        const user = adminUsers.find(u => u.id === transaction.userId) || { name: 'Unknown User' };
        const itemsCount = transaction.items.length;
        const firstItem = transaction.items[0];

        return `
            <tr>
                <td><input type="checkbox" class="transaction-checkbox" value="${transaction.id}"></td>
                <td>${transaction.id}</td>
                <td>${user.name}</td>
                <td>${firstItem.name}${itemsCount > 1 ? ` +${itemsCount - 1} lainnya` : ''}</td>
                <td>Rp ${transaction.total.toLocaleString()}</td>
                <td>${transaction.payment || 'COD'}</td>
                <td><span class="status-badge status-${transaction.status}">${getOrderStatusName(transaction.status)}</span></td>
                <td>${formatDate(transaction.date)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-info btn-small" onclick="viewTransaction(${transaction.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-warning btn-small" onclick="updateTransactionStatus('${transaction.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function getCategoryName(categoryId) {
    return categoryId;
}

function getOrderStatusName(status) {
    switch (status) {
        case 'pending': return 'Pending';
        case 'processing': return 'Processing';
        case 'shipped': return 'Shipped';
        case 'delivered': return 'Delivered';
        case 'cancelled': return 'Cancelled';
        default: return 'Unknown';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function loadProductSpecifications(specifications) {
    const container = document.getElementById('specifications-container');
    container.innerHTML = ''; 

    for (const name in specifications) {
        if (specifications.hasOwnProperty(name)) {
            const value = specifications[name];
            const newRow = document.createElement('div');
            newRow.className = 'specification-row';
            newRow.innerHTML = `
                <input type="text" placeholder="Nama spesifikasi" class="spec-name" value="${name}">
                <input type="text" placeholder="Nilai spesifikasi" class="spec-value" value="${value}">
                <button type="button" onclick="removeSpecification(this)" class="btn btn-danger btn-small">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            container.appendChild(newRow);
        }
    }
}