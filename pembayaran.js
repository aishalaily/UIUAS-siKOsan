function goBack() {
  window.history.back()
}

let orderData = {}
let shippingCost = 10000
let discountAmount = 0

function initializePayment() {
  loadOrderItems()
  setupEventListeners()
  updateCartCount()
}

function loadOrderItems() {
  const checkoutItems = JSON.parse(localStorage.getItem("checkout")) || []
  const paymentOrderId = localStorage.getItem("paymentOrderId")

  let items = []

  if (paymentOrderId) {
    const orders = JSON.parse(localStorage.getItem("orderHistory")) || []
    const order = orders.find((o) => o.id === paymentOrderId)
    if (order) {
      items = order.items
    }
    localStorage.removeItem("paymentOrderId")
  } else if (checkoutItems.length > 0) {
    items = checkoutItems
  }

  if (items.length === 0) {
    alert("Tidak ada item untuk dibayar")
    window.location.href = "keranjang.html"
    return
  }

  displayOrderItems(items)
  calculateTotal(items)
}

function displayOrderItems(items) {
  const container = document.getElementById("order-items")
  container.innerHTML = ""

  items.forEach((item) => {
    const div = document.createElement("div")
    div.className = "order-item"

    const itemTotal = Number.parseInt(item.harga.replace(/[^\d]/g, "")) * item.qty

    div.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}">
      <div class="item-info">
        <div class="item-name">${item.nama}</div>
        <div class="item-details">${item.variant} × ${item.qty}</div>
      </div>
    `

    container.appendChild(div)
  })
}

function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => {
    return sum + Number.parseInt(item.harga.replace(/[^\d]/g, "")) * item.qty
  }, 0)

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
  const total = subtotal + shippingCost - discountAmount

  document.getElementById("total-items").textContent = totalItems
  document.getElementById("subtotal").textContent = `Rp ${subtotal.toLocaleString("id-ID")}`
  document.getElementById("shipping-cost").textContent = `Rp ${shippingCost.toLocaleString("id-ID")}`
  document.getElementById("total-payment").textContent = `Rp ${total.toLocaleString("id-ID")}`

  if (discountAmount > 0) {
    document.getElementById("discount-amount").textContent = `-Rp ${discountAmount.toLocaleString("id-ID")}`
    document.getElementById("discount-row").style.display = "flex"
  }

  orderData = {
    items,
    subtotal,
    shippingCost,
    discountAmount,
    total,
  }
}

function setupEventListeners() {
  document.querySelectorAll('input[name="shipping"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      switch (this.value) {
        case "reguler":
          shippingCost = 10000
          break
        case "express":
          shippingCost = 20000
          break
        case "sameday":
          shippingCost = 35000
          break
      }
      calculateTotal(orderData.items)
    })
  })
}

function applyPromo() {
  const promoCode = document.getElementById("promo-code").value.trim().toUpperCase()

  const promoCodes = {
    HEMAT10: 0.1, // 10% discount
    NEWUSER: 15000, // Rp 15.000 discount
    GRATIS: 0.05, // 5% discount
  }

  if (promoCodes[promoCode]) {
    const discount = promoCodes[promoCode]

    if (discount < 1) {
      discountAmount = orderData.subtotal * discount
    } else {
      discountAmount = discount
    }

    calculateTotal(orderData.items)
    alert(`Promo code "${promoCode}" berhasil diterapkan!`)
    document.getElementById("promo-code").value = ""
  } else {
    alert("Kode promo tidak valid")
  }
}

function processPayment() {
  if (!validateForm()) {
    return
  }

  const formData = getFormData()

  const orderId = generateOrderId()
  const order = {
    id: orderId,
    date: new Date().toISOString().slice(0, 10),
    status: formData.paymentMethod === "cod" ? "processing" : "pending",
    items: orderData.items,
    total: orderData.subtotal,
    shipping: orderData.shippingCost,
    discount: orderData.discountAmount,
    shippingAddress: formData.shippingAddress,
    paymentMethod: formData.paymentMethod,
    shippingMethod: formData.shippingMethod,
  }

  const orders = JSON.parse(localStorage.getItem("orderHistory")) || []
  orders.unshift(order)
  localStorage.setItem("orderHistory", JSON.stringify(orders))

  localStorage.removeItem("checkout")

  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const updatedKeranjang = keranjang.filter((cartItem) => {
    return !orderData.items.some(
      (orderItem) => orderItem.nama === cartItem.nama && orderItem.variant === cartItem.variant,
    )
  })
  localStorage.setItem("keranjang", JSON.stringify(updatedKeranjang))

  showSuccessModal(orderId, orderData.total + orderData.shippingCost - orderData.discountAmount)
}

function validateForm() {
  const requiredFields = ["nama-lengkap", "nomor-hp", "alamat", "kota", "kode-pos"]

  for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId)
    if (!field.value.trim()) {
      alert(`${field.previousElementSibling.textContent} harus diisi`)
      field.focus()
      return false
    }
  }

  const paymentMethod = document.querySelector('input[name="payment"]:checked')
  if (!paymentMethod) {
    alert("Pilih metode pembayaran")
    return false
  }

  return true
}

function getFormData() {
  return {
    shippingAddress: {
      namaLengkap: document.getElementById("nama-lengkap").value,
      nomorHp: document.getElementById("nomor-hp").value,
      alamat: document.getElementById("alamat").value,
      kota: document.getElementById("kota").value,
      kodePos: document.getElementById("kode-pos").value,
      catatan: document.getElementById("catatan").value,
    },
    shippingMethod: document.querySelector('input[name="shipping"]:checked').value,
    paymentMethod: document.querySelector('input[name="payment"]:checked').value,
  }
}

function generateOrderId() {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "")
  const timeStr = Date.now().toString().slice(-3)
  return `ORD-${dateStr}-${timeStr}`
}

function showSuccessModal(orderId, total) {
  document.getElementById("order-id").textContent = orderId
  document.getElementById("order-total").textContent = `Rp ${total.toLocaleString("id-ID")}`
  document.getElementById("success-modal").classList.add("active")
}

function goToHistory() {
  window.location.href = "history.html"
}

function continueShopping() {
  window.location.href = "produk.html"
}

function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0)
  document.getElementById("cart-count").textContent = totalItems
}

document.addEventListener("DOMContentLoaded", initializePayment)
