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
  tampilkanArtikelTerbaru()
})

function tampilkanProdukPopuler(jumlah = 5) {
  const container = document.getElementById("popular-products")
  if (!container) return

  const produkPopuler = produkList.slice(0, jumlah)
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

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()

  const container = document.getElementById("latest-articles")

  if (typeof articles !== "undefined" && Array.isArray(articles)) {
    // Ambil 3 artikel terbaru saja
    articles.slice(0, 3).forEach((article) => {
      const card = document.createElement("div")
      card.className = "article-card"

      card.innerHTML = `
        <img src="${article.image}" alt="${article.title}" />
        <div class="article-content">
          <h3 class="article-title">${article.title}</h3>
          <p class="article-description">${article.description}</p>
          <div class="article-meta">${article.date} • ${article.readTime}</div>
        </div>
      `

      // Simpan artikel ke localStorage dan buka halaman detail saat diklik
      card.addEventListener("click", () => {
        localStorage.setItem("artikelDipilih", JSON.stringify(article))
        window.location.href = "detail_artikel.html"
      })

      container.appendChild(card)
    })
  } else {
    container.innerHTML = "<p>Tidak ada artikel untuk ditampilkan.</p>"
  }
})
