// Fungsi untuk kembali ke halaman sebelumnya
function goBack() {
  window.history.back()
}

// Fungsi untuk mengupdate jumlah item di keranjang
function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || []
  const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0)
  document.getElementById("cart-count").textContent = totalItems
}

// Fungsi untuk menangani dropdown role
function setupDropdown() {
  const dropdownToggle = document.querySelector(".dropdown-toggle")
  const dropdownContainer = document.querySelector(".dropdown-container")

  if (dropdownToggle && dropdownContainer) {
    // Toggle dropdown saat tombol diklik
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      dropdownContainer.classList.toggle("active")
    })

    // Tutup dropdown saat mengklik di luar dropdown
    document.addEventListener("click", (e) => {
      if (!dropdownContainer.contains(e.target)) {
        dropdownContainer.classList.remove("active")
      }
    })

    // Mencegah dropdown tertutup saat mengklik di dalam dropdown
    const dropdownMenu = dropdownContainer.querySelector(".dropdown-menu")
    if (dropdownMenu) {
      dropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation()
      })
    }
  }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  setupDropdown()
})
