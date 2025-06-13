function goBack() {
    window.history.back()
}

document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("artikelDipilih"))
    if (!data) return

    document.getElementById("judul-artikel").textContent = data.title
    document.getElementById("tanggal-artikel").textContent = data.date
    document.getElementById("gambar-artikel").src = data.image
    document.getElementById("gambar-artikel").alt = data.title
    document.getElementById("isi-artikel").innerHTML = data.content
})


function loadArticle() {
    const id = parseInt(getArticleIdFromURL(), 10);
    const article = articles.find(a => a.id === id);

    if (!article) {
    document.getElementById('articleContent').innerHTML = "<p>Artikel tidak ditemukan.</p>";
    return;
    }

    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('articleMeta').textContent = `${article.date} • ${article.readTime}`;
    document.getElementById('articleImage').src = article.image;
    document.getElementById('articleImage').alt = article.title;
    document.getElementById('articleContent').innerHTML = article.content;
}

document.addEventListener('DOMContentLoaded', loadArticle);