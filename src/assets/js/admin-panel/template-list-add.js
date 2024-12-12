// Kaydet Butonuna Tıklama Olayı
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button.btn-success").addEventListener("click", () => {
    const templateTitle = document.querySelector("#post-title").value;
    const category = document.querySelector("#eventCategory").value;
    const image = document.querySelector("#file-input").files[0];

    // Boş Alanları Kontrol Et
    if (!templateTitle || !category || !image) {
      alert("Tüm alanları doldurun!");
      return;
    }

    // Dosya Okuma ve Kaydetme
    const reader = new FileReader();
    reader.onload = function (e) {
      saveTemplate(templateTitle, category, e.target.result);
      window.location.href = "templates.html"; // Şablon Listeleme Sayfasına Yönlendirme
    };
    reader.readAsDataURL(image);
  });
});

// Şablon Verisini LocalStorage'a Kaydet
function saveTemplate(title, category, imageUrl) {
  const templates = JSON.parse(localStorage.getItem("templates")) || [];
  templates.push({ title, category, imageUrl });
  localStorage.setItem("templates", JSON.stringify(templates));
}

// Template.html Sayfası için Şablonları Listele
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("templates.html")) {
    const templates = JSON.parse(localStorage.getItem("templates")) || [];
    templates.forEach(({ title, category, imageUrl }) => {
      addTemplateToList(title, category, imageUrl);
    });
  }
});

// Şablonu Uygun Sekmeye Ekle
function addTemplateToList(title, category, imageUrl) {
  const tabContentId = category === "Masa Kartı" ? "#table-card" : "#invitation";

  // Görüntü Boyutlarını Kategoriye Göre Ayarla
  const imageStyle =
    category === "Masa Kartı"
      ? "width: 505px; height: 358px; object-fit: cover;" // Yatay görünüm
      : "width: 358px; height: 505px; object-fit: cover;"; // Dikey görünüm

  const cardHTML = `
    <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-4">
      <a class="card style-6 product__card--bg" href="./templates-detail.html">
        <img src="${imageUrl}" class="card-img-top" alt="${title}" style="${imageStyle}" />
        <div class="card-footer">
          <div class="row">
            <div class="col-12 mb-4">
              <b>${title}</b>
            </div>
          </div>
        </div>
      </a>
    </div>
  `;

  document.querySelector(`${tabContentId} .row`).insertAdjacentHTML("beforeend", cardHTML);
}

// Form Submit Olayını Engelle
if (document.querySelector("form")) {
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
