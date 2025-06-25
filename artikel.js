function goBack() {
  window.history.back()
}

function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

function searchArtikel() {
  const input = document.getElementById("article-search");
  const cards = document.querySelectorAll(".article-card");

  if (!input) return;
  const keyword = input.value.toLowerCase();

  cards.forEach((card) => {
    const judul = card.querySelector(".article-title").textContent.toLowerCase();
    const deskripsi = card.querySelector(".article-description").textContent.toLowerCase();

    if (judul.includes(keyword) || deskripsi.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

window.articles = [
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
    image: "https://i.pinimg.com/736x/de/d3/38/ded338287c07d0ecbf9713d320a52644.jpg",
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
  },
  {
    id: 5,
    image: "https://i.pinimg.com/736x/5e/f7/47/5ef7474aac33e09e9f693d2b73282040.jpg",
    title: "5 Kebiasaan Positif yang Bikin Anak Kos Lebih Produktif",
    description: "Ingin hidup lebih tertata dan produktif sebagai anak kos? Simak kebiasaan baik berikut!",
    date: "June 13, 2025",
    readTime: "4 min read",
    content: `
      <p>Menjadi anak kos seringkali identik dengan hidup santai dan bebas, tapi bukan berarti kamu tidak bisa tetap produktif dan sehat. Justru di masa inilah kamu bisa membentuk kebiasaan baik yang akan sangat berguna di masa depan. Berikut 5 kebiasaan positif yang bisa kamu terapkan:</p>

      <h3>1. Bangun dan Tidur Teratur</h3>
      <p>Mulailah membiasakan diri untuk tidur dan bangun di jam yang sama setiap hari. Pola tidur yang baik akan membantu menjaga energi dan konsentrasi sepanjang hari.</p>

      <h3>2. Menyusun To-Do List Harian</h3>
      <p>Buat daftar tugas atau aktivitas yang ingin kamu capai hari itu. Ini membantu kamu tetap fokus dan tidak membuang waktu untuk hal-hal yang kurang penting.</p>

      <h3>3. Rutin Merapikan Kamar</h3>
      <p>Kamar yang bersih dan rapi bisa meningkatkan suasana hati dan membuatmu lebih semangat belajar atau bekerja. Cukup sisihkan 10-15 menit setiap pagi atau malam.</p>

      <h3>4. Masak Makanan Sendiri</h3>
      <p>Selain lebih hemat, memasak sendiri juga bisa menjadi aktivitas menyenangkan. Kamu bisa bereksperimen dengan menu baru sekaligus menjaga kesehatan.</p>

      <h3>5. Sempatkan Olahraga Ringan</h3>
      <p>Jangan malas bergerak! Stretching, jalan kaki, atau senam ringan di kamar bisa membuat badan lebih bugar dan pikiran lebih segar.</p>

      <p>Kebiasaan kecil ini jika dilakukan secara konsisten bisa memberi dampak besar untuk hidupmu sebagai anak kos. Yuk mulai sekarang dan rasakan perubahannya!</p>
    `
  },
  {
    id: 6,
    image: "https://i.pinimg.com/736x/58/7b/b5/587bb5c7bef0ab4caf360fecd3e63783.jpg",
    title: "Tips Tetap Produktif Meski Tinggal di Kamar Kos Sempit",
    description: "Kamar kecil bukan halangan buat tetap produktif. Ini dia tipsnya!",
    date: "June 10, 2025",
    readTime: "5 min read",
    content: `
      <p>Kamar kos yang sempit bukan alasan untuk malas atau tidak produktif. Justru dengan penataan dan kebiasaan yang tepat, kamu bisa memaksimalkan ruang untuk belajar, bekerja, dan istirahat dengan nyaman.</p>

      <h3>1. Gunakan Furnitur Multifungsi</h3>
      <p>Pilih meja belajar yang juga bisa jadi meja makan atau kasur lipat yang bisa dijadikan sofa.</p>

      <h3>2. Tata Barang Secara Vertikal</h3>
      <p>Gunakan rak gantung atau rak susun agar barang tidak menumpuk di lantai dan kamar terasa lebih lega.</p>

      <h3>3. Atur Cahaya dengan Baik</h3>
      <p>Gunakan lampu meja untuk fokus belajar dan buka jendela agar kamar tidak pengap.</p>

      <h3>4. Bersihkan Kamar Secara Berkala</h3>
      <p>Kamar bersih bikin pikiran tenang dan semangat untuk aktivitas produktif.</p>

      <p>Dengan penataan yang tepat, kamu bisa nyaman tinggal dan tetap semangat menjalani aktivitas meskipun tinggal di ruang terbatas.</p>
    `
  },
  {
    id: 7,
    image: "https://i.pinimg.com/736x/f3/f2/a2/f3f2a2d6b0c26389bc95260364251cef.jpg",
    title: "Ide Dekorasi Kamar Kos Estetik Budget Anak Kos",
    description: "Percantik kamar kos kamu tanpa menguras kantong!",
    date: "June 5, 2025",
    readTime: "4 min read",
    content: `
      <p>Ingin kamar kos yang nyaman dan estetik? Tenang, kamu bisa mendekorasi kamar kos tanpa harus belanja mahal-mahal. Yuk, intip ide-ide ini!</p>

      <h3>1. Gunakan Lampu LED Strip</h3>
      <p>Hanya dengan 20 ribuan, kamu sudah bisa punya kamar yang terlihat lebih hangat dan cozy.</p>

      <h3>2. Tempel Foto atau Poster Favorit</h3>
      <p>Gunakan tali dan penjepit kayu untuk menggantung foto. Bisa juga tambahkan quotes motivasi biar makin semangat.</p>

      <h3>3. Rak Dinding dari Kardus Bekas</h3>
      <p>Buat rak kecil dari kardus bekas untuk tempat buku atau aksesoris kecil.</p>

      <h3>4. Tambahkan Tanaman Hias Mini</h3>
      <p>Satu pot kecil tanaman hias bisa bikin suasana kamar lebih hidup dan segar.</p>

      <p>Dengan kreativitas dan barang-barang sederhana, kamar kos kamu bisa berubah jadi tempat ternyaman untuk beristirahat maupun belajar!</p>
    `
  },
  {
  id: 8,
  image: "https://i.pinimg.com/736x/59/2a/65/592a65d3664d94286b31fdbe65864dc0.jpg",
  title: "5 Resep Masakan Simpel Anak Kos Cuma Pakai 3 Bahan!",
  description: "Masak hemat & cepat buat kamu yang sibuk kuliah!",
  date: "May 30, 2025",
  readTime: "5 min read",
  content: `
    <p>Masak di kos sering jadi tantangan karena keterbatasan alat dan waktu. Tapi jangan khawatir, ini 5 resep simpel cuma butuh 3 bahan aja!</p>

    <h3>1. Telur Dadar Sosis</h3>
    <p>Bahan: telur, sosis, garam. Kocok semua lalu goreng. Simple, enak, bergizi!</p>

    <h3>2. Mie Goreng Sayur</h3>
    <p>Bahan: mie instan, kol, wortel. Rebus sayur lalu masukkan ke mie instan yang sudah digoreng.</p>

    <h3>3. Nasi Telur Kecap</h3>
    <p>Bahan: nasi, telur, kecap. Telur ceplok pakai kecap manis, sajikan di atas nasi hangat.</p>

    <h3>4. Roti Telur Panggang</h3>
    <p>Bahan: roti tawar, telur, keju (optional). Oles telur ke roti lalu panggang di teflon.</p>

    <h3>5. Tumis Tahu Pedas</h3>
    <p>Bahan: tahu, cabai, garam. Goreng tahu, tumis cabai, lalu campur jadi satu.</p>

    <p>Dengan resep simpel ini, kamu tetap bisa makan enak tanpa ribet. Cocok buat anak kos yang hemat dan sibuk!</p>
  `
},
{
  id: 9,
  image: "https://i.pinimg.com/736x/15/ff/29/15ff297fd5451543db3b2b9f3fc7cdaf.jpg",
  title: "Tips Menjaga Kesehatan Mental Saat Jadi Anak Kos",
  description: "Tinggal jauh dari keluarga bisa jadi berat. Yuk jaga kesehatan mental dengan cara ini!",
  date: "May 25, 2025",
  readTime: "4 min read",
  content: `
    <p>Jauh dari rumah, jauh dari orang tua, kadang bikin anak kos merasa kesepian dan stres. Tapi tenang, kamu bisa tetap sehat secara mental dengan langkah sederhana berikut ini.</p>

    <h3>1. Jaga Komunikasi dengan Keluarga</h3>
    <p>Telepon atau video call keluarga secara rutin agar tetap terhubung dan merasa didukung.</p>

    <h3>2. Buat Rutinitas Harian</h3>
    <p>Rutinitas membantu menghindari perasaan kosong dan membuat hari lebih terstruktur.</p>

    <h3>3. Cari Teman Cerita</h3>
    <p>Jangan dipendam sendiri. Curhat ke teman bisa sangat membantu meringankan beban pikiran.</p>

    <h3>4. Luangkan Waktu untuk Diri Sendiri</h3>
    <p>Nonton film, jalan kaki sore, atau mendengarkan musik bisa jadi waktu "healing" pribadi.</p>

    <p>Kesehatan mental sama pentingnya dengan fisik. Jangan abaikan, ya. Jadi anak kos itu berat, tapi kamu nggak sendiri kok!</p>
  `
},
]

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const searchInput = document.getElementById("article-search");
  if (searchInput) {
    searchInput.addEventListener("input", searchArtikel);
  }
  const container = document.getElementById("articles");
  if (!container || !window.articles || articles.length === 0) {
    console.warn("Elemen artikel tidak ditemukan atau data artikel belum tersedia");
    return;
  }

  articles.slice(0, 9).forEach((article) => {
    const card = document.createElement("div");
    card.className = "article-card";

    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <div class="article-content">
        <div class="article-title">${article.title}</div>
        <div class="article-description">${article.description}</div>
        <div class="article-meta">${article.date} • ${article.readTime}</div>
      </div>
    `;

    card.addEventListener("click", () => {
      localStorage.setItem("artikelDipilih", JSON.stringify(article));
      window.location.href = "detail_artikel.html";
    });

    container.appendChild(card);
  });
});