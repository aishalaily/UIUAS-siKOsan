function goBack() {
  window.history.back()
}

// Fungsi untuk mengupdate jumlah item di keranjang
function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0)
  document.getElementById("cart-count").textContent = totalItems
}

const articles = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/6f/ef/65/6fef6510a38473b5d43b26ebd9516e41.jpg",
    title: "12 Barang Wajib Dimiliki Anak Kos Agar Hidup Lebih Praktis",
    description: "Simak 12 barang penting yang akan memudahkan hidup anak kos!",
    date: "May 18, 2025",
    readTime: "6 min read",
    content: `
      <p>Menjadi anak kos berarti harus mandiri dalam mengatur segala hal, termasuk perlengkapan harian. Untuk membuat hidup lebih praktis dan nyaman, berikut adalah 12 barang yang sebaiknya dimiliki oleh setiap anak kos:</p>

      <h3>1. Rice Cooker Multifungsi</h3>
      <p>Tidak hanya untuk memasak nasi, rice cooker juga bisa digunakan untuk merebus mie, menghangatkan makanan, hingga membuat kue.</p>

      <h3>2. Set Alat Makan & Minum</h3>
      <p>Minimal siapkan piring, gelas, sendok, dan garpu agar kamu bisa makan dengan nyaman tanpa perlu pinjam ke tetangga kos.</p>

      <h3>3. Dispenser atau Pemanas Air</h3>
      <p>Pemanas air penting untuk kamu yang suka minum kopi atau teh, terutama di pagi hari atau saat cuaca dingin.</p>

      <h3>4. Lemari Plastik Serbaguna</h3>
      <p>Lemari ini ringan, mudah dibongkar-pasang, dan sangat berguna untuk menyimpan baju, alat tulis, atau perlengkapan mandi.</p>

      <h3>5. Kipas Angin atau Air Cooler</h3>
      <p>Cuaca panas bikin tidak nyaman? Pastikan kamu punya alat pendingin ruangan agar bisa tidur lebih nyenyak.</p>

      <h3>6. Stop Kontak Tambahan</h3>
      <p>Biasanya kamar kos hanya menyediakan 1-2 colokan. Pakai stop kontak tambahan agar kamu bisa menyalakan lebih banyak perangkat sekaligus.</p>

      <h3>7. Alat Kebersihan (Sapu, Lap, dan Ember)</h3>
      <p>Kebersihan kamar adalah kunci kenyamanan. Siapkan alat dasar untuk membersihkan kamar secara rutin.</p>

      <h3>8. Rak Serbaguna</h3>
      <p>Gunakan rak untuk menyimpan buku, makanan ringan, atau kosmetik agar kamar tetap rapi dan tertata.</p>

      <h3>9. Lampu Meja atau Lampu Tidur</h3>
      <p>Lampu ini sangat membantu saat kamu belajar malam hari tanpa mengganggu teman sekamar (jika ada).</p>

      <h3>10. Tempat Sampah Mini</h3>
      <p>Buang sampah pada tempatnya. Tempat sampah kecil membantu menjaga kebersihan kamar.</p>

      <h3>11. Gantungan Baju atau Jemuran Lipat</h3>
      <p>Sangat berguna untuk menjemur pakaian dalam atau handuk agar tidak lembap di kamar.</p>

      <h3>12. Power Bank</h3>
      <p>Untuk kamu yang sering mobile, power bank penting agar tetap bisa berkomunikasi kapan pun dibutuhkan.</p>

      <p>Dengan memiliki perlengkapan di atas, hidup sebagai anak kos akan jauh lebih mudah, efisien, dan menyenangkan. Yuk mulai lengkapi perlengkapanmu!</p>
    `
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/65/e5/e3/65e5e3fecedd0eaf52a64784db028661.jpg",
    title: "Hidup Anak Kos: Antara Kebebasan dan Tantangan",
    description: "Hidup sebagai anak kos adalah fase yang penuh warna...",
    date: "May 16, 2025",
    readTime: "3 min read",
    content: `
      <p>
      Menjadi anak kos adalah salah satu fase hidup yang menarik sekaligus menantang. 
      Di satu sisi, kita mendapatkan kebebasan untuk mengatur hidup sendiri, namun di sisi lain,
      muncul tanggung jawab baru yang mungkin belum pernah dihadapi sebelumnya.
      </p>

      <p>
        Salah satu kebebasan yang paling terasa adalah tidak adanya aturan ketat dari orang tua.
        Kita bisa menentukan jadwal tidur, makan, bahkan cara kita mengatur waktu dan kebersihan kamar. 
        Namun, kebebasan ini juga bisa menjadi bumerang jika tidak dikelola dengan baik. 
        Pola hidup yang tidak teratur bisa berdampak buruk pada kesehatan dan akademik.
      </p>

      <p>
        Tantangan terbesar hidup sebagai anak kos biasanya berkaitan dengan keuangan dan kemandirian. 
        Mengatur uang bulanan agar cukup untuk makan, transportasi, dan kebutuhan lainnya 
        bisa menjadi hal yang sulit, apalagi jika ada pengeluaran tak terduga.
      </p>

      <p>
        Tidak hanya itu, anak kos juga harus belajar bertanggung jawab atas dirinya sendiri — 
        mulai dari mencuci pakaian, memasak, membersihkan kamar, hingga belajar menyelesaikan masalah tanpa bantuan keluarga.
      </p>
      <br>
      <h3>Tips Menjalani Hidup Anak Kos</h3>
      <ul>
        <li>Buat jadwal harian agar waktu lebih teratur.</li>
        <li>Catat pengeluaran agar tidak boros.</li>
        <li>Jaga kebersihan dan kenyamanan kamar.</li>
        <li>Bangun relasi yang baik dengan teman kos atau tetangga.</li>
        <li>Jangan ragu minta bantuan saat benar-benar butuh.</li>
      </ul>

      <p>
        Hidup sebagai anak kos memang tidak mudah, tetapi bisa menjadi pengalaman berharga 
        yang membentuk karakter lebih mandiri, tangguh, dan dewasa. 
        Jalani dengan bijak dan nikmati setiap momennya.
      </p>
    `
  },
  {
    id: 3,
    image: "https://via.placeholder.com/600x400",
    title: "Tips Hemat Belanja Bulanan Anak Kos",
    description: "Transform your space with easy, aesthetic updates.",
    date: "June 14, 2025",
    readTime: "3 min read",
    content: `
      <p>Menjadi anak kos bukan hanya soal hidup mandiri, tapi juga pintar mengatur keuangan. Salah satu tantangan terbesar adalah belanja bulanan. Jika tidak dikelola dengan baik, bisa-bisa uang habis sebelum akhir bulan. Berikut beberapa tips hemat yang bisa kamu coba:</p>
      
      <h3>1. Buat Daftar Belanja</h3>
      <p>Sebelum pergi ke supermarket atau warung, pastikan kamu sudah membuat daftar kebutuhan. Ini membantu kamu fokus dan menghindari belanja impulsif.</p>
      
      <h3>2. Bandingkan Harga</h3>
      <p>Jangan malas untuk membandingkan harga antar toko, terutama untuk barang pokok seperti beras, minyak, dan mie instan. Selisih sedikit bisa berdampak besar dalam jangka panjang.</p>
      
      <h3>3. Manfaatkan Promo & Diskon</h3>
      <p>Banyak aplikasi belanja online seperti ShopeeFood, GrabMart, dan Tokopedia menawarkan promo khusus. Gunakan kesempatan ini untuk membeli stok kebutuhanmu dengan harga miring.</p>
      
      <h3>4. Belanja Dalam Jumlah Besar (Patungan)</h3>
      <p>Kalau kamu tinggal bareng teman kos, kamu bisa patungan untuk beli barang dalam jumlah besar agar lebih murah. Contohnya: beli sabun, minyak goreng, atau tisu dalam kemasan grosir.</p>
      
      <h3>5. Masak Sendiri</h3>
      <p>Selain lebih hemat, masak sendiri juga lebih sehat. Cobalah masak makanan sederhana seperti nasi goreng, tumis sayur, atau telur dadar yang bahan-bahannya murah dan mudah didapat.</p>
      
      <h3>6. Gunakan Aplikasi Pencatat Keuangan</h3>
      <p>Catat semua pengeluaranmu setiap hari. Dengan begitu kamu bisa evaluasi pengeluaran dan tahu ke mana saja uangmu pergi.</p>
      
      <p>Dengan perencanaan yang tepat, kamu bisa tetap kenyang dan dompet aman sampai akhir bulan. Selamat mencoba!</p>
    `
  },
  {
    id: 4,
    image: "https://i.pinimg.com/736x/df/87/e1/df87e1373145de199befa2466391489a.jpg",
    title: "Tips Mengatur Keuangan Anak Kos agar Nggak Bokek di Tengah Bulan",
    description: "Biar nggak 'nangis di tanggal tua', coba tips hemat ini!",
    date: "June 4, 2025",
    readTime: "7 min read",
    content: `
      <h2>Tips Mengatur Keuangan Anak Kos agar Nggak Bokek di Tengah Bulan</h2>
      <p><strong>Hidup sebagai anak kos</strong> memang seru, tapi urusan keuangan bisa jadi mimpi buruk kalau tidak dikelola dengan baik. Gaji atau uang bulanan dari orang tua harus cukup untuk makan, bayar kos, transportasi, hingga kebutuhan pribadi. Nah, biar nggak “nangis di tanggal tua”, berikut beberapa tips mengatur keuangan yang bisa kamu coba:</p>
      <br>
      <h3>1. Buat Anggaran Bulanan (Budgeting)</h3>
      <p>Sebelum uang habis tanpa jejak, atur dulu anggaran bulanan. Bagi pengeluaran menjadi beberapa kategori:</p>
      <ul>
        <li>Sewa kos</li>
        <li>Makan sehari-hari</li>
        <li>Transportasi</li>
        <li>Pulsa/kuota</li>
        <li>Kebutuhan harian (sabun, deterjen, dll.)</li>
        <li>Dana darurat & tabungan</li>
      </ul>
      <p>Contoh pembagian (dari uang Rp2.000.000):</p>
      <ul>
        <li>Sewa kos: Rp800.000</li>
        <li>Makan: Rp600.000</li>
        <li>Transportasi: Rp200.000</li>
        <li>Kuota: Rp100.000</li>
        <li>Kebutuhan harian: Rp100.000</li>
        <li>Tabungan: Rp200.000</li>
      </ul>

      <h3>2. Pisahkan Uang Secara Fisik atau Digital</h3>
      <p>Kalau perlu, simpan uang di amplop terpisah atau pakai aplikasi e-wallet/banking yang bisa membagi “dompet” secara virtual. Cara ini membantu kamu lebih disiplin dan tahu kapan harus berhenti jajan.</p>

      <h3>3. Masak Sendiri Sesekali</h3>
      <p>Jajan terus bisa boros. Coba masak sederhana seperti telur dadar, mie sayur, atau tumis-tumisan. Selain lebih hemat, kamu juga bisa mengontrol asupan gizi. Nggak perlu jago masak kok—yang penting niat!</p>

      <h3>4. Cari Promo dan Diskon</h3>
      <p>Anak kos harus jadi “detektif promo”. Manfaatkan diskon di aplikasi ojek online, minimarket, atau platform belanja online. Tapi ingat, beli karena butuh, bukan karena murah.</p>

      <h3>5. Batasi Pengeluaran Impulsif</h3>
      <p>Lapar mata bisa jadi musuh utama. Sebelum beli barang, tanya dulu ke diri sendiri: “Perlu banget nggak, ya?” Kalau bisa ditunda, lebih baik simpan uangnya dulu.</p>

      <h3>6. Cari Penghasilan Tambahan</h3>
      <p>Kalau masih sempat, kamu bisa coba freelance, jualan online, jadi asisten dosen, atau kerja paruh waktu. Tambahan pemasukan bisa bikin hidup lebih lega.</p>

      <h3>7. Sediakan Dana Darurat</h3>
      <p>Uang tak terduga selalu datang: sakit, rusak HP, atau kehabisan pulsa saat penting. Sisihkan sedikit uang tiap bulan untuk dana darurat. Sedikit demi sedikit, lama-lama jadi gunung!</p>

      <h3>Penutup</h3>
      <p>Mengatur keuangan memang butuh disiplin dan kesabaran, apalagi kalau kamu hidup sendiri sebagai anak kos. Tapi, kalau dilakukan dengan konsisten, kamu nggak cuma bisa “selamat” sampai akhir bulan—kamu juga belajar mandiri secara finansial. Yuk mulai bijak dari sekarang!</p>
    `
  }
]

const container = document.getElementById("articleGrid")

articles.forEach((article) => {
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

  // Event klik
  card.addEventListener("click", () => {
    localStorage.setItem("artikelDipilih", JSON.stringify(article))
    window.location.href = "detail_artikel.html"
  })

  container.appendChild(card)
})


// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
})
