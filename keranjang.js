function goBack() {
  window.history.back()
}

const promoCodes = {
  HEMAT10: { type: "percentage", value: 0.1, description: "10% discount" },
  NEWUSER: { type: "fixed", value: 15000, description: "Rp 15.000 discount" },
  GRATIS: { type: "percentage", value: 0.05, description: "5% discount" },
  STUDENT: { type: "fixed", value: 10000, description: "Rp 10.000 discount" },
}

let appliedPromo = null

function loadKeranjang() {
  const cartList = document.getElementById("cart-list")
  const emptyCart = document.getElementById("empty-cart")
  const cartContent = document.querySelector(".cart-content")
  const recommendedSection = document.getElementById("recommended-section")
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []

  cartList.innerHTML = ""

  if (keranjang.length === 0) {
    cartContent.style.display = "none"
    document.getElementById("cart-summary").style.display = "none"
    emptyCart.style.display = "block"
    recommendedSection.style.display = "block"
    loadRecommendedProducts()
    return
  }

  cartContent.style.display = "grid"
  document.getElementById("cart-summary").style.display = "block"
  emptyCart.style.display = "none"
  recommendedSection.style.display = "none"

  keranjang.forEach((item, index) => {
    const div = document.createElement("div")
    div.classList.add("cart-item")
    div.style.animationDelay = `${index * 0.1}s`

    const hargaAngka = Number.parseInt(item.harga.replace(/[^\d]/g, "")) * item.qty

    div.innerHTML = `
      <input type="checkbox" class="checkout-checkbox" id="chk-${index}" checked />
      <img src="${item.gambar}" alt="${item.nama}" class="cart-img"/>
      <div class="cart-info">
        <h3>${item.nama}</h3>
        <p><i class="fas fa-palette"></i> Varian: ${item.variant}</p>
        <p><i class="fas fa-tag"></i> Harga: ${item.harga}</p>
        <div class="qty-wrapper">
          <label for="qty-${index}"><i class="fas fa-sort-numeric-up"></i> Kuantitas:</label>
          <input type="number" id="qty-${index}" value="${item.qty}" min="1" onchange="ubahQty(${index}, this.value)"/>
        </div>
      </div>
      <div class="cart-actions">
        <button onclick="hapusItem(${index})" class="btn delete">
          <i class="fas fa-trash-alt"></i>
          Hapus
        </button>
      </div>
    `

    cartList.appendChild(div)
  })

  updateTotalHarga()
  setupCheckboxListener()
}

function hapusItem(index) {
  if (confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang?")) {
    const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
    keranjang.splice(index, 1)
    localStorage.setItem("keranjang", JSON.stringify(keranjang))
    loadKeranjang()
    showNotification("Item berhasil dihapus dari keranjang", "success")
  }
}

function hapusSemua() {
  if (confirm("Yakin ingin menghapus semua isi keranjang?")) {
    localStorage.removeItem("keranjang")
    appliedPromo = null
    loadKeranjang()
    showNotification("Semua item berhasil dihapus dari keranjang", "success")
  }
}

function ubahQty(index, newQty) {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const qty = Number.parseInt(newQty)

  if (qty < 1) {
    document.getElementById(`qty-${index}`).value = keranjang[index].qty
    return
  }

  keranjang[index].qty = qty
  localStorage.setItem("keranjang", JSON.stringify(keranjang))
  updateTotalHarga()
  showNotification("Kuantitas berhasil diperbarui", "info")
}

function updateTotalHarga() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []

  let subtotal = 0
  let totalItem = 0

  keranjang.forEach((item, index) => {
    const checkbox = document.getElementById(`chk-${index}`)
    if (checkbox && checkbox.checked) {
      const harga = Number.parseInt(item.harga.replace(/[^\d]/g, "")) * item.qty
      subtotal += harga
      totalItem += item.qty
    }
  })

  const ongkir = subtotal > 50000 ? 0 : 10000

  let diskon = 0
  if (appliedPromo) {
    if (appliedPromo.type === "percentage") {
      diskon = subtotal * appliedPromo.value
    } else {
      diskon = appliedPromo.value
    }
  }

  const total = subtotal + ongkir - diskon

  document.getElementById("total-items").textContent = totalItem
  document.getElementById("total-harga").textContent = `Rp ${subtotal.toLocaleString("id-ID")}`
  document.getElementById("shipping-cost").textContent = `Rp ${ongkir.toLocaleString("id-ID")}`
  document.getElementById("discount-amount").textContent = `-Rp ${diskon.toLocaleString("id-ID")}`
  document.getElementById("discount-row").style.display = diskon > 0 ? "flex" : "none"
  document.getElementById("total-amount").textContent = `Rp ${total.toLocaleString("id-ID")}`
  document.getElementById("cart-count").textContent = totalItem

  const checkoutBtn = document.getElementById("checkout-btn")
  if (totalItem === 0) {
    checkoutBtn.disabled = true
    checkoutBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Pilih Item untuk Checkout'
  } else {
    checkoutBtn.disabled = false
    checkoutBtn.innerHTML = '<i class="fas fa-credit-card"></i> Lanjut ke Pembayaran'
  }
}

function setupCheckboxListener() {
  const checkboxes = document.querySelectorAll(".checkout-checkbox")
  checkboxes.forEach((cb) => {
    cb.addEventListener("change", updateTotalHarga)
  })
}

function applyPromo() {
  const promoCode = document.getElementById("promo-code").value.trim().toUpperCase()

  if (!promoCode) {
    showNotification("Masukkan kode promo terlebih dahulu", "warning")
    return
  }

  if (promoCodes[promoCode]) {
    appliedPromo = promoCodes[promoCode]
    updateTotalHarga()
    document.getElementById("promo-code").value = ""
    showNotification(`Promo "${promoCode}" berhasil diterapkan! ${appliedPromo.description}`, "success")
  } else {
    showNotification("Kode promo tidak valid atau sudah kadaluarsa", "error")
  }
}

function checkout() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const checkedItems = []

  keranjang.forEach((item, index) => {
    const checkbox = document.getElementById(`chk-${index}`)
    if (checkbox && checkbox.checked) {
      checkedItems.push(item)
    }
  })

  if (checkedItems.length === 0) {
    showNotification("Pilih minimal satu item untuk checkout", "warning")
    return
  }

  localStorage.setItem("checkout", JSON.stringify(checkedItems))

  if (appliedPromo) {
    localStorage.setItem("appliedPromo", JSON.stringify(appliedPromo))
  }

  showNotification(`Mengarahkan ke halaman pembayaran...`, "info")

  setTimeout(() => {
    window.location.href = "pembayaran.html"
  }, 1000)
}

function loadRecommendedProducts() {
  const recommendedProducts = [
    {
      nama: "Sabun Cair Lifebuoy",
      harga: "25000",
      gambar: "https://i.pinimg.com/736x/54/ed/56/54ed569897aa9fe19fff8726d244fcdf.jpg",
    },
    {
      nama: "Shampoo Sunslik",
      harga: "45000",
      gambar: "https://i.pinimg.com/736x/db/8f/e1/db8fe165605c4a8881eed59f4942fe9a.jpg",
    },
    {
      nama: "Handuk",
      harga: "35000",
      gambar: "https://i.pinimg.com/736x/29/3e/d0/293ed07cf5a69b908bd6f2b141dc7697.jpg",
    },
    {
      nama: "Lampu Tidur",
      harga: "35000",
      gambar: "https://i.pinimg.com/736x/1f/5f/73/1f5f73d6bff05e2efacf2adf08fd52c5.jpg",
    },
  ]

  const container = document.getElementById("recommended-products")
  container.innerHTML = ""

  recommendedProducts.forEach((product) => {
    const div = document.createElement("div")
    div.className = "product-card"
    div.innerHTML = `
      <img src="${product.gambar}" alt="${product.nama}">
      <h4>${product.nama}</h4>
      <p class="price">Rp ${Number.parseInt(product.harga).toLocaleString("id-ID")}</p>
      <button class="btn btn-primary" onclick="addToCartFromRecommended('${product.nama}', '${product.harga}', '${product.gambar}')">
        <i class="fas fa-plus"></i> Tambah
      </button>
    `
    container.appendChild(div)
  })
}

function addToCartFromRecommended(nama, harga, gambar) {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []

  const existingIndex = keranjang.findIndex((item) => item.nama === nama)

  if (existingIndex !== -1) {
    keranjang[existingIndex].qty += 1
  } else {
    keranjang.push({
      nama: nama,
      harga: harga,
      gambar: gambar,
      qty: 1,
      variant: "Default",
    })
  }

  localStorage.setItem("keranjang", JSON.stringify(keranjang))
  loadKeranjang()
  showNotification(`${nama} berhasil ditambahkan ke keranjang!`, "success")
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : type === "warning" ? "#f59e0b" : "#3b82f6"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    font-weight: 600;
    max-width: 300px;
    animation: slideInRight 0.3s ease-out;
    backdrop-filter: blur(10px);
  `

  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : type === "warning" ? "exclamation-triangle" : "info-circle"}"></i>
      <span>${message}</span>
    </div>
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-out"
      setTimeout(() => notification.remove(), 300)
    }
  }, 3000)
}

const style = document.createElement("style")
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  .product-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    border: 1px solid rgba(226, 232, 240, 0.5);
    transition: all 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  }
  
  .product-card img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1rem;
  }
  
  .product-card h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #111827;
  }
  
  .product-card .price {
    font-size: 1.1rem;
    font-weight: 700;
    color: #ef4444;
    margin-bottom: 1rem;
  }
  
  .product-card .btn {
    width: 100%;
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`
document.head.appendChild(style)

window.addEventListener("DOMContentLoaded", loadKeranjang)

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });
});
