function goBack() {
  window.history.back()
}

function filterKategori(kategori) {
  document.querySelectorAll(".category-filter").forEach((btn) => {
    btn.classList.remove("active")
  })

  const activeBtn = Array.from(document.querySelectorAll(".category-filter")).find(
    (btn) => btn.getAttribute("onclick") === `filterKategori('${kategori}')`
  )
  if (activeBtn) activeBtn.classList.add("active")

  const cards = document.querySelectorAll(".produk-card")
  cards.forEach((card) => {
    if (kategori === "all" || card.classList.contains(kategori)) {
      card.classList.remove("hidden")
    } else {
      card.classList.add("hidden")
    }
  })
}

function searchProduk() {
  const input = document.getElementById("product-search").value.toLowerCase()
  const cards = document.querySelectorAll(".produk-card")

  cards.forEach((card) => {
    const namaProduk = card.querySelector("h4").textContent.toLowerCase()
    if (namaProduk.includes(input)) {
      card.classList.remove("hidden")
    } else {
      card.classList.add("hidden")
    }
  })
}

function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0)
  document.getElementById("cart-count").textContent = totalItems
}

function displayProducts(products) {
  const produkGrid = document.getElementById("produkGrid")
  produkGrid.innerHTML = "" 

  products.forEach((produk) => {
    const card = document.createElement("div")
    card.className = `produk-card ${produk.kategori}`
    card.onclick = () => bukaDetailProduk(produk)

    card.innerHTML = `
      <img src="${produk.gambar}" alt="${produk.nama}">
      <h4>${produk.nama}</h4>
      ${produk.hargaDiskon ? `<p class="harga-diskon">Rp ${produk.hargaDiskon.toLocaleString()}</p>` : ""}
      <p class="harga">Rp ${produk.harga.toLocaleString()}</p>
    `

    produkGrid.appendChild(card)
  })
}

window.produkList = [
  {
    nama: "Satu Set Pisau",
    kategori: "dapur",
    gambar: "https://i.pinimg.com/736x/e7/fe/69/e7fe69cb512b73e4d2a0076440ad25d0.jpg",
    hargaDiskon: 100000,
    harga: 87000,
    varian: ["Set", "Satuan"],
  },
  {
    nama: "Toples Bumbu Kayu",
    kategori: "dapur",
    gambar: "https://i.pinimg.com/736x/c7/67/8f/c7678f65776e12a83c84afc8610a26c5.jpg",
    harga: 149000,
    varian: ["Set", "Satuan"],
  },
  {
    nama: "Sendok",
    kategori: "dapur",
    gambar: "https://i.pinimg.com/736x/40/80/32/4080322e1465bbbe92e6c88c695f7d34.jpg",
    harga: 19000,
    varian: ["Set", "Satuan"],
  },
  {
    nama: "Satu set Alat Makan",
    kategori: "dapur",
    gambar: "https://i.pinimg.com/736x/98/46/49/984649950a9dcfaf7c427a8421399dc6.jpg",
    harga: 47000,
  },
  {
    nama: "Telenan",
    kategori: "dapur",
    gambar: "https://i.pinimg.com/736x/6e/14/85/6e1485c14da1b422d6d700b08c6509cc.jpg",
    harga: 39000,
    varian: ["Kayu", "Plastik"],
  },
  {
    nama: "Sepatula",
    kategori: "dapur",
    gambar: "https://i.pinimg.com/736x/1e/50/02/1e50022ccfe06e3ab3d4e0d98613a377.jpg",
    harga: 45000,
    varian: ["Kayu", "Plastik"],
  },
  {
    nama: "Piring Plastik",
    kategori: "dapur",
    gambar: "https://i.pinimg.com/736x/94/35/7a/94357a9b48368cb48e114960c37afe76.jpg",
    harga: 45000,
    varian: ["Biru", "Pink", "Kuning", "Putih", "Hijau"],
  },
  {
    nama: "Gelas Plastik",
    kategori: "dapur",
    gambar: "https://i.pinimg.com/736x/d7/b9/da/d7b9dafcfb50f7b6fa88217cc186d584.jpg",
    harga: 40000,
    varian: ["Pink","Putih", "Hijau"],
  },
  {
    nama: "Sabun Cair Lifebuoy",
    kategori: "mandi",
    gambar: "https://i.pinimg.com/736x/54/ed/56/54ed569897aa9fe19fff8726d244fcdf.jpg",
    harga: 25000,
    varian: ["250ml", "500ml"],
  },
  {
    nama: "Sabun Cair Lux",
    kategori: "mandi",
    gambar: "https://i.pinimg.com/736x/41/1d/50/411d504f8c45555ab6f40d6103ea03e6.jpg",
    harga: 17000,
    varian: ["200ml", "400ml"],
  },
  {
    nama: "Sabun Cair Dove",
    kategori: "mandi",
    gambar: "https://i.pinimg.com/736x/74/80/d2/7480d2a3cfb7229bace7351440d73d1e.jpg",
    harga: 20000,
    varian: ["300ml"],
  },
  {
    nama: "Shampoo Sunslik",
    kategori: "mandi",
    gambar: "https://i.pinimg.com/736x/db/8f/e1/db8fe165605c4a8881eed59f4942fe9a.jpg",
    harga: 45000,
    varian: ["160ml", "320ml"],
  },
  {
    nama: "Shampoo Head&Shoulders",
    kategori: "mandi",
    gambar: "https://i.pinimg.com/736x/aa/8a/cf/aa8acfe0bc815ece98555914056499b5.jpg",
    harga: 60000,
    varian: ["400ml", "800ml"],
  },
  {
    nama: "Handuk",
    kategori: "mandi",
    gambar: "https://i.pinimg.com/736x/29/3e/d0/293ed07cf5a69b908bd6f2b141dc7697.jpg",
    harga: 35000,
    varian: ["besar", "kecil"],
  },
  {
    nama: "Sikat Gigi",
    kategori: "mandi",
    gambar: "https://i.pinimg.com/736x/2e/e3/65/2ee36560d2a68999f5d06e8cb9705af8.jpg",
    harga: 18000,
    varian: [],
  },
  {
    nama: "Pasta Gigi",
    kategori: "mandi",
    gambar: "https://i.pinimg.com/736x/9d/5d/c9/9d5dc911c7b5e92cda68d568fec37faf.jpg",
    harga: 20000,
    varian: ["besar", "sedang", "kecil"],
  },
  {
    nama: "Kemoceng 2.8m",
    kategori: "kebersihan",
    gambar: "https://i.pinimg.com/736x/d0/0e/f3/d00ef3591b727f12d1e5dd1cbf55ac01.jpg",
    harga: 55000,
    varian: ["2.8 meter"],
  },
  {
    nama: "Sapu Mini",
    kategori: "kebersihan",
    harga: 15000,
    gambar: "https://i.pinimg.com/736x/b3/03/e3/b303e3464ecdc0911b0b51d086bd7e15.jpg",
    varian: ["Biru", "Merah", "Hijau"],
  },
  {
    nama: "Sapu",
    kategori: "kebersihan",
    harga: 35000,
    gambar: "https://i.pinimg.com/736x/45/9a/e2/459ae26b8211cfbece6ca69714547446.jpg",
    varian: ["Kecil", "Besar"],
  },
  {
    nama: "Pel Lantai",
    kategori: "kebersihan",
    harga: 89000,
    gambar: "https://i.pinimg.com/736x/dc/b3/20/dcb3208e9c32013d74e2ffac8c5d2f4a.jpg",
  },
  {
    nama: "Tempat Sampah",
    kategori: "kebersihan",
    harga: 45000,
    gambar: "https://i.pinimg.com/736x/1e/ec/4c/1eec4c63493701752a577f9d51b9f5cc.jpg",
    varian: ["Kecil", "Sedang", "Besar"],
  },
  {
    nama: "Pengharum Ruangan Otomatis",
    kategori: "kebersihan",
    gambar: "https://i.pinimg.com/736x/3a/fb/d4/3afbd4689be2c37b25b607a3048c66e3.jpg",
    harga: 65000,
    varian: ["Lavender", "Lemon", "Ocean"],
  },
  {
    nama: "Pengharum Ruangan",
    kategori: "kebersihan",
    gambar: "https://i.pinimg.com/736x/8b/86/9a/8b869ac3c2b609595d81d3763c0d6af3.jpg",
    harga: 63000,
    varian: ["Botol Kecil", "Botol Besar"],
  },
  {
    nama: "Pengki Sampah",
    kategori: "kebersihan",
    harga: 62000,
    gambar: "https://i.pinimg.com/736x/1f/8b/20/1f8b20d9b9605ad2b1d972405e80c217.jpg",
    varian: [],
  },
  {
    nama: "Kain Lap",
    kategori: "kebersihan",
    gambar: "https://i.pinimg.com/736x/76/85/05/76850574c6ced8292480de5ed77dc778.jpg",
    harga: 62000,
    varian: ["satuan", "lusinan"],
  },
  {
    nama: "Sikat Toilet",
    kategori: "kebersihan",
    harga: 28000,
    gambar: "https://i.pinimg.com/736x/e8/c9/45/e8c94561ef44411dad2d31c97b0876d8.jpg",
    varian: [],
  },
  {
    nama: "Tempat Sabun Batang",
    kategori: "kebersihan",
    harga: 40000,
    gambar: "https://i.pinimg.com/736x/f8/14/b8/f814b8304266c05ea74de0e34b4df05b.jpg",
    varian: [],
  },
  {
    nama: "Penebah Kasur",
    kategori: "kebersihan",
    harga: 10000,
    gambar: "https://i.pinimg.com/736x/ed/7d/81/ed7d81f9198d9f95fd05bcf3efbc69fc.jpg",
    varian: [],
  },
  {
    nama: "Lampu",
    kategori: "elektronik",
    harga: 25000,
    gambar: "https://i.pinimg.com/736x/c2/1f/1a/c21f1a64528d4625a355a8743abc525c.jpg",
    varian: ["LED", "Neon"],
  },
  {
    nama: "Chopper",
    kategori: "elektronik",
    harga: 85000,
    gambar: "https://i.pinimg.com/736x/ba/23/fb/ba23fb7a823f871ff9597a651cc88799.jpg",
  },
  {
    nama: "Airfryer",
    kategori: "elektronik",
    harga: 85000,
    gambar: "https://i.pinimg.com/736x/55/09/41/550941a6cb7e7bd8ea6ecaa214d95605.jpg",
  },
  {
    nama: "Blender",
    kategori: "elektronik",
    harga: 105000,
    gambar: "https://i.pinimg.com/736x/b6/0b/24/b60b240cd48116a7ae4e7e2dc4b6b320.jpg",
  },
  {
    nama: "Panci Listrik",
    kategori: "elektronik",
    gambar: "https://i.pinimg.com/736x/b3/0a/1a/b30a1a165e3f7c7b6b0cfdea9bb4bc76.jpg",
    harga: 125000,
    varian: ["Pink", "Putih"],
  },
  {
    nama: "Setrika",
    kategori: "elektronik",
    harga: 200000,
    gambar: "https://i.pinimg.com/736x/71/de/92/71de92a3164df5b15fd9eb74e3bfb819.jpg",
    varian: ["Uap", "Biasa"],
  },
  {
    nama: "Catokan Rambut",
    kategori: "elektronik",
    gambar: "https://i.pinimg.com/736x/1f/55/d0/1f55d0021e5335e7fd6d2279bb5020c1.jpg",
    harga: 200000,
    varian: ["Mini", "Professional"],
  },
  {
    nama: "Hairdryer",
    kategori: "elektronik",
    gambar: "https://i.pinimg.com/736x/e9/f6/63/e9f663861af5ac6de17ded8b4e79a113.jpg",
    harga: 250000,
    varian: ["Ringan", "Besar"],
  },
  {
    nama: "Kabel Roll",
    kategori: "elektronik",
    gambar: "https://i.pinimg.com/736x/83/2d/7e/832d7e648f7280bd59799b79fed6ae5f.jpg",
    harga: 45000,
    varian: ["3M", "5M", "10M"],
  },
  {
    nama: "Stop Kontak T",
    kategori: "elektronik",
    gambar: "https://i.pinimg.com/736x/d2/9e/7a/d29e7a3e094cc2e0192ba3c85a5b8178.jpg",
    harga: 15000,
    varian: ["2 Lubang", "3 Lubang"],
  },
  {
    nama: "Kipas Portable",
    kategori: "elektronik",
    harga: 75000,
    gambar: "https://i.pinimg.com/736x/6d/a3/0a/6da30a34ad0eb24a92082723011ce487.jpg",
    varian: ["Biru", "Putih"],
  },
  {
    nama: "Kipas Angin",
    kategori: "elektronik",
    harga: 105000,
    gambar: "https://i.pinimg.com/736x/a8/77/31/a87731446a54e193992695bf5400dd51.jpg",
    varian: ["Meja", "Dinding"],
  },
  {
    nama: "Sprei Kasur",
    kategori: "tidur",
    harga: 60000,
    gambar: "https://i.pinimg.com/736x/c1/a8/25/c1a825c60d4c3e29228ef27c055c760b.jpg",
    varian: ["Single", "Queen", "King"],
  },
  {
    nama: "Selimut",
    kategori: "tidur",
    harga: 70000,
    gambar: "https://i.pinimg.com/736x/16/e5/fa/16e5fa804f70e7fe2c093c1235566cc2.jpg",
    varian: ["Tipis", "Tebal"],
  },
  {
    kategori: "tidur",
    nama: "Bantal Guling",
    harga: 12000,
    gambar: "https://i.pinimg.com/736x/1c/d5/ad/1cd5adfd2b931a95159afef47344403b.jpg",
    varian: ["Kecil", "Sedang", "Besar"],
  },
  {
    kategori: "tidur",
    nama: "Lampu Tidur Lucu",
    harga: 49000,
    gambar: "https://i.pinimg.com/736x/e1/dd/6e/e1dd6eab5cabec59bdd3797e53b4230a.jpg",
    varian: ["Putih", "Kuning", "RGB"],
  },
  {
    kategori: "tidur",
    nama: "Lampu Tidur",
    harga: 35000,
    gambar: "https://i.pinimg.com/736x/1f/5f/73/1f5f73d6bff05e2efacf2adf08fd52c5.jpg",
    varian: ["Bulat", "Kotak"],
  },
  {
    kategori: "tidur",
    nama: "Jam Alarm",
    harga: 50000,
    gambar: "https://i.pinimg.com/736x/0f/3c/ca/0f3cca3dca988a0f84d15d2be4ea0092.jpg",
    varian: ["Digital", "Analog"],
  },
  {
    kategori: "tidur",
    nama: "Jam Dinding",
    harga: 46000,
    gambar: "https://i.pinimg.com/736x/eb/47/63/eb4763a65633db9660efe149675a6d51.jpg",
  },
  {
    kategori: "tidur",
    nama: "Boneka Singa",
    harga: 46000,
    gambar: "https://i.pinimg.com/736x/46/d3/c0/46d3c05747607e98439c992d9bfa1bcc.jpg",
  },
]

const produkGrid = document.getElementById("produkGrid")

displayProducts(produkList)

function bukaDetailProduk(produk) {
  console.log("Detail Produk:", { produk })

  localStorage.setItem("produkDetail", JSON.stringify(produk))
  window.location.href = "detail_produk.html"
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
})

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });
});
