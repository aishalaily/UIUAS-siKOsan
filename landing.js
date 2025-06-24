function goBack() {
  window.history.back()
}

function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0)
  document.getElementById("cart-count").textContent = totalItems
}

function setupDropdown() {
  const dropdownToggle = document.querySelector(".dropdown-toggle")
  const dropdownContainer = document.querySelector(".dropdown-container")

  if (dropdownToggle && dropdownContainer) {
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      dropdownContainer.classList.toggle("active")
    })

    document.addEventListener("click", (e) => {
      if (!dropdownContainer.contains(e.target)) {
        dropdownContainer.classList.remove("active")
      }
    })

    const dropdownMenu = dropdownContainer.querySelector(".dropdown-menu")
    if (dropdownMenu) {
      dropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation()
      })
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  setupDropdown()
  tampilkanProdukPopuler()
})

function tampilkanProdukPopuler(jumlah = 5) {
  const container = document.getElementById("popular-products")
  if (!container) return

  const produkPopuler = produkList.slice(0, jumlah) // ambil 6 produk pertama
  produkPopuler.forEach(produk => {
    const card = document.createElement("div")
    card.className = "produk-card"
    card.onclick = () => bukaDetailProduk(produk)

    card.innerHTML = `
      <img src="${produk.gambar}" alt="${produk.nama}" class="product-img">
      <h4 class="product-name">${produk.nama}</h4>
      <p class="product-price">Rp ${produk.harga.toLocaleString()}</p>
    `
    container.appendChild(card)
  })
}

const articleCard = document.createElement("div")
articleCard.className = "article-card"

articleCard.innerHTML = `
  <img src="${artikel.gambar}" alt="${artikel.judul}">
  <div class="article-content">
    <h4>${artikel.judul}</h4>
    <p>${artikel.ringkasan}</p>
  </div>
`

