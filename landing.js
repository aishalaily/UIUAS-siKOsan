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
})
