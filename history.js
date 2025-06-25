function goBack() {
  window.history.back()
}

let currentFilter = "all"
let currentPage = 1
const ordersPerPage = 5

function initializeHistory() {
  let orders = JSON.parse(localStorage.getItem("orderHistory")) || []

  if (orders.length === 0) {
    orders = sampleOrders
    localStorage.setItem("orderHistory", JSON.stringify(orders))
  }

  displayOrders(orders)
  updateCartCount()
}

function displayOrders(orders) {
  const ordersList = document.getElementById("orders-list")
  const emptyHistory = document.getElementById("empty-history")

  let filteredOrders = orders
  if (currentFilter !== "all") {
    filteredOrders = orders.filter((order) => order.status === currentFilter)
  }

  if (filteredOrders.length === 0) {
    ordersList.style.display = "none"
    emptyHistory.style.display = "block"
    return
  }

  ordersList.style.display = "block"
  emptyHistory.style.display = "none"

  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  ordersList.innerHTML = ""

  paginatedOrders.forEach((order) => {
    const orderCard = createOrderCard(order)
    ordersList.appendChild(orderCard)
  })

  createPagination(filteredOrders.length)
}

function createOrderCard(order) {
  const card = document.createElement("div")
  card.className = "order-card"

  const statusText = getStatusText(order.status)
  const itemsHtml = order.items
    .slice(0, 2)
    .map(
      (item) => `
    <div class="order-item">
      <img src="${item.gambar}" alt="${item.nama}">
      <div class="item-info">
        <div class="item-name">${item.nama}</div>
        <div class="item-details">${item.variant} × ${item.qty}</div>
      </div>
    </div>
  `,
    )
    .join("")

  const moreItems = order.items.length > 2 ? `<p>+${order.items.length - 2} produk lainnya</p>` : ""

  card.innerHTML = `
    <div class="order-header">
      <div>
        <div class="order-id">${order.id}</div>
        <div class="order-date">${formatDate(order.date)}</div>
      </div>
      <div class="order-status status-${order.status}">${statusText}</div>
    </div>
    
    <div class="order-items">
      ${itemsHtml}
      ${moreItems}
    </div>
    
    <div class="order-footer">
      <div class="order-total">
        Total: Rp ${(order.total + order.shipping).toLocaleString("id-ID")}
      </div>
      <div class="order-actions">
        <button class="btn btn-secondary btn-small" onclick="viewOrderDetail('${order.id}')">
          Detail
        </button>
        ${getActionButtons(order)}
      </div>
    </div>
  `

  return card
}

function getStatusText(status) {
  const statusMap = {
    pending: "Menunggu Pembayaran",
    processing: "Diproses",
    shipped: "Dikirim",
    delivered: "Selesai",
    cancelled: "Dibatalkan",
  }
  return statusMap[status] || status
}

function getActionButtons(order) {
  switch (order.status) {
    case "pending":
      return `
        <button class="btn btn-primary btn-small" onclick="payOrder('${order.id}')">
          Bayar
        </button>
        <button class="btn btn-danger btn-small" onclick="cancelOrder('${order.id}')">
          Batal
        </button>
      `
    case "shipped":
      return `
        <button class="btn btn-primary btn-small" onclick="trackOrder('${order.id}')">
          Lacak
        </button>
      `
    case "delivered":
      return `
        <button class="btn btn-primary btn-small" onclick="reorderItems('${order.id}')">
          Pesan Lagi
        </button>
      `
    default:
      return ""
  }
}

function filterOrders(status) {
  currentFilter = status
  currentPage = 1

  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  const orders = JSON.parse(localStorage.getItem("orderHistory")) || sampleOrders
  displayOrders(orders)
}

function searchOrders() {
  const searchTerm = document.getElementById("order-search").value.toLowerCase().trim()
  const orders = JSON.parse(localStorage.getItem("orderHistory")) || sampleOrders

  if (searchTerm === "") {
    displayOrders(orders)
    return
  }

  const filteredOrders = orders.filter((order) => {
    const idMatch = order.id.toLowerCase().includes(searchTerm)
    const itemMatch = order.items.some((item) =>
      item.nama.toLowerCase().includes(searchTerm)
    )
    return idMatch || itemMatch
  })

  currentPage = 1 
  displayOrders(filteredOrders)
}

function clearSearch() {
  document.getElementById("order-search").value = ""
  searchOrders()
}


function viewOrderDetail(orderId) {
  const orders = JSON.parse(localStorage.getItem("orderHistory")) || sampleOrders
  const order = orders.find((o) => o.id === orderId)

  if (!order) return

  const modal = document.getElementById("order-detail-modal")
  const content = document.getElementById("order-detail-content")

  const itemsHtml = order.items
    .map(
      (item) => `
    <div class="order-item" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
      <img src="${item.gambar}" alt="${item.nama}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
      <div class="item-info">
        <div class="item-name" style="font-weight: 500; margin-bottom: 0.25rem;">${item.nama}</div>
        <div class="item-details" style="color: #6b7280; font-size: 0.9rem;">
          ${item.variant} × ${item.qty} = Rp ${(Number.parseInt(item.harga) * item.qty).toLocaleString("id-ID")}
        </div>
      </div>
    </div>
  `,
    )
    .join("")

  content.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <h4>Informasi Pesanan</h4>
      <p><strong>ID Pesanan:</strong> ${order.id}</p>
      <p><strong>Tanggal:</strong> ${formatDate(order.date)}</p>
      <p><strong>Status:</strong> <span class="order-status status-${order.status}">${getStatusText(order.status)}</span></p>
      ${order.trackingNumber ? `<p><strong>Nomor Resi:</strong> ${order.trackingNumber}</p>` : ""}
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      <h4>Produk yang Dipesan</h4>
      ${itemsHtml}
    </div>
    
    <div>
      <h4>Ringkasan Pembayaran</h4>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span>Subtotal:</span>
        <span>Rp ${order.total.toLocaleString("id-ID")}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span>Ongkos Kirim:</span>
        <span>Rp ${order.shipping.toLocaleString("id-ID")}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #e5e7eb; padding-top: 0.5rem;">
        <span>Total:</span>
        <span>Rp ${(order.total + order.shipping).toLocaleString("id-ID")}</span>
      </div>
    </div>
  `

  modal.classList.add("active")
}

function closeOrderDetail() {
  document.getElementById("order-detail-modal").classList.remove("active")
}

function payOrder(orderId) {
  localStorage.setItem("paymentOrderId", orderId)
  window.location.href = "pembayaran.html"
}

function cancelOrder(orderId) {
  if (confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
    const orders = JSON.parse(localStorage.getItem("orderHistory")) || sampleOrders
    const orderIndex = orders.findIndex((o) => o.id === orderId)

    if (orderIndex !== -1) {
      orders[orderIndex].status = "cancelled"
      localStorage.setItem("orderHistory", JSON.stringify(orders))
      displayOrders(orders)
      alert("Pesanan berhasil dibatalkan")
    }
  }
}

function trackOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem("orderHistory")) || sampleOrders
  const order = orders.find((o) => o.id === orderId)

  if (order && order.trackingNumber) {
    alert(
      `Nomor resi: ${order.trackingNumber}\n\nPesanan Anda sedang dalam perjalanan. Silakan cek status pengiriman di website kurir.`,
    )
  }
}

function reorderItems(orderId) {
  const orders = JSON.parse(localStorage.getItem("orderHistory")) || sampleOrders
  const order = orders.find((o) => o.id === orderId)

  if (order) {
    const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []

    order.items.forEach((item) => {
      const existingIndex = keranjang.findIndex((k) => k.nama === item.nama && k.variant === item.variant)

      if (existingIndex !== -1) {
        keranjang[existingIndex].qty += item.qty
      } else {
        keranjang.push({
          nama: item.nama,
          harga: item.harga,
          gambar: item.gambar,
          qty: item.qty,
          variant: item.variant,
        })
      }
    })

    localStorage.setItem("keranjang", JSON.stringify(keranjang))
    alert("Produk berhasil ditambahkan ke keranjang!")
    updateCartCount()
  }
}

function createPagination(totalOrders) {
  const pagination = document.getElementById("pagination")
  const totalPages = Math.ceil(totalOrders / ordersPerPage)

  if (totalPages <= 1) {
    pagination.innerHTML = ""
    return
  }

  let paginationHTML = ""

  paginationHTML += `
    <button ${currentPage === 1 ? "disabled" : ""} onclick="changePage(${currentPage - 1})">
      <i class="fas fa-chevron-left"></i>
    </button>
  `

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="${i === currentPage ? "active" : ""}" onclick="changePage(${i})">
        ${i}
      </button>
    `
  }

  paginationHTML += `
    <button ${currentPage === totalPages ? "disabled" : ""} onclick="changePage(${currentPage + 1})">
      <i class="fas fa-chevron-right"></i>
    </button>
  `

  pagination.innerHTML = paginationHTML
}

function changePage(page) {
  currentPage = page
  const orders = JSON.parse(localStorage.getItem("orderHistory")) || sampleOrders
  displayOrders(orders)
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("id-ID", options)
}

function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0)
  document.getElementById("cart-count").textContent = totalItems
}

document.addEventListener("DOMContentLoaded", initializeHistory)
