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

function tampilkanProdukPopuler(jumlah = 5) {
  const container = document.getElementById("popular-products")
  if (!container || !window.produkList) return

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

function tampilkanArtikelTerbaru(jumlah = 3) {
  const container = document.getElementById("latest-articles")
  if (!container || !window.articles || articles.length === 0) {
    console.warn("Elemen artikel tidak ditemukan atau data artikel belum tersedia")
    return
  }

  articles.slice(0, jumlah).forEach((article) => {
    const card = document.createElement("div")
    card.className = "article-card"

    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <div class="article-content">
        <div class="article-title">${article.title}</div>
        <div class="article-description">${article.description}</div>
        <div class="article-meta">${article.date} • ${article.readTime}</div>
      </div>
    `

    card.addEventListener("click", () => {
      localStorage.setItem("artikelDipilih", JSON.stringify(article))
      window.location.href = "detail_artikel.html"
    })

    container.appendChild(card)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  setupDropdown()
  tampilkanProdukPopuler()
  tampilkanArtikelTerbaru()
})

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });
});

