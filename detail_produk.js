document.addEventListener("DOMContentLoaded", () => {
  const produk = JSON.parse(localStorage.getItem("produkDetail"))

  if (produk) {
    document.getElementById("detail-gambar").src = produk.gambar
    document.getElementById("detail-nama").textContent = produk.nama
    document.getElementById("detail-harga").textContent = "Rp " + produk.harga
  }

  const variantContainer = document.getElementById("variant-container")

  if (produk?.varian?.length > 0) {
    produk.varian.forEach((v, index) => {
      const btn = document.createElement("button")
      btn.textContent = v
      btn.className = "variant"
      if (index === 0) btn.classList.add("active")
      btn.onclick = () => {
        selectVariant(btn)
      }
      variantContainer.appendChild(btn)
    })
  }

  function selectVariant(btn) {
    document.querySelectorAll(".variant").forEach((button) => button.classList.remove("active"))
    btn.classList.add("active")
  }

  let qty = 1
  const qtyDisplay = document.getElementById("qty")

  window.increase = () => {
    qty++
    qtyDisplay.textContent = qty
  }

  window.decrease = () => {
    if (qty > 1) {
      qty--
      qtyDisplay.textContent = qty
    }
  }

  document.getElementById("add-to-cart").addEventListener("click", () => {
    const nama = document.getElementById("detail-nama").textContent
    const harga = document.getElementById("detail-harga").textContent.replace("Rp ", "")
    const gambar = document.getElementById("detail-gambar").src
    const variant = document.querySelector(".variant.active")?.textContent || "Default"

    const produkKeranjang = {
      nama,
      harga,
      gambar,
      qty,
      variant,
    }

    const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []

    const index = keranjang.findIndex(
      (item) => item.nama === produkKeranjang.nama && item.variant === produkKeranjang.variant,
    )
    if (index !== -1) {
      keranjang[index].qty += produkKeranjang.qty
    } else {
      keranjang.push(produkKeranjang)
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjang))
    alert("Produk ditambahkan ke keranjang!")
    updateCartCount()
  })

  updateCartCount()
})

function goBack() {
  window.history.back()
}

function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0)
  document.getElementById("cart-count").textContent = totalItems
}
