function goBack() {
  window.history.back()
}

// Fungsi untuk mengupdate jumlah item di keranjang
function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0)
  document.getElementById("cart-count").textContent = totalItems
}

function loadCheckoutItems() {
  const checkoutContainer = document.getElementById("checkout-items")
  const totalElem = document.getElementById("total-bayar")
  const items = JSON.parse(localStorage.getItem("checkout")) || []

  checkoutContainer.innerHTML = ""
  let total = 0

  if (items.length === 0) {
    checkoutContainer.innerHTML = "<p>Tidak ada produk yang dipilih.</p>"
    totalElem.textContent = "Rp 0"
    return
  }

  items.forEach((item) => {
    const hargaAngka = Number.parseInt(item.harga.replace(/[^\d]/g, "")) * item.qty
    total += hargaAngka

    const div = document.createElement("div")
    div.classList.add("checkout-item")
    div.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}">
      <div class="checkout-info">
        <h3>${item.nama}</h3>
        <p>Varian: ${item.variant}</p>
        <p>Harga: ${item.harga} x ${item.qty}</p>
      </div>
    `
    checkoutContainer.appendChild(div)
  })

  totalElem.textContent = `Rp ${total.toLocaleString("id-ID")}`
}

function prosesPembayaran() {
  alert("Pembayaran berhasil! Terima kasih telah berbelanja.")

  const checkoutItems = JSON.parse(localStorage.getItem("checkout")) || []
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || []

  keranjang = keranjang.filter((item) => {
    return !checkoutItems.some((ci) => ci.nama === item.nama && ci.variant === item.variant)
  })

  localStorage.setItem("keranjang", JSON.stringify(keranjang))
  localStorage.removeItem("checkout")

  updateCartCount()

  window.location.href = "keranjang.html"
}

window.addEventListener("DOMContentLoaded", () => {
  loadCheckoutItems()
  updateCartCount()
})
