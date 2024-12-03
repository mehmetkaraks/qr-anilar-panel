async function addTemplate() {
  // Form verilerini al
  const title = document.getElementById("post-title")?.value.trim();
  const category = document.getElementById("category")?.value.trim();
  const fileInput = document.querySelector(".template__add--img");
  const pdfInput = document.querySelector("#product-images");

  // Form doğrulama
  if (!title) {
    alert("Lütfen başlık girin.");
    return;
  }
  if (!category) {
    alert("Lütfen kategori girin.");
    return;
  }
  if (!fileInput?.files.length) {
    alert("Lütfen bir resim dosyası seçin.");
    return;
  }
  if (!pdfInput?.files.length) {
    alert("Lütfen bir PDF dosyası seçin.");
    return;
  }

  // Yüklenen dosyalar için URL'leri saklamak
  let imageUrl = "";
  let pdfUrl = "";

  // Resim dosyasını sunucuya yükleme
  try {
    const imageFormData = new FormData();
    imageFormData.append("file", fileInput.files[0]);

    const imageResponse = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: imageFormData,
    });

    if (!imageResponse.ok) {
      throw new Error("Resim yüklenirken hata oluştu.");
    }

    const imageResult = await imageResponse.json();
    imageUrl = imageResult.fileUrl;
  } catch (error) {
    console.error("Resim yükleme hatası:", error);
    alert("Resim yükleme başarısız oldu.");
    return;
  }

  // PDF dosyasını sunucuya yükleme
  try {
    const pdfFormData = new FormData();
    pdfFormData.append("file", pdfInput.files[0]);

    const pdfResponse = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: pdfFormData,
    });

    if (!pdfResponse.ok) {
      throw new Error("PDF yüklenirken hata oluştu.");
    }

    const pdfResult = await pdfResponse.json();
    pdfUrl = pdfResult.fileUrl;
  } catch (error) {
    console.error("PDF yükleme hatası:", error);
    alert("PDF yükleme başarısız oldu.");
    return;
  }

  // Yeni şablon oluştur
  const newTemplate = `
    <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-4">
      <a class="card style-6 product__card--bg" href="${pdfUrl}" target="_blank">
        <img src="${imageUrl}" class="card-img-top" alt="${title}" />
        <div class="card-footer">
          <div class="row">
            <div class="col-12 text-center">
              <b>${title}</b>
            </div>
          </div>
        </div>
      </a>
    </div>
  `;

  // Şablonları eklemek için hedef div'i bulun
  const templatesContainer = document.querySelector(".template-container");
  if (templatesContainer) {
    templatesContainer.innerHTML += newTemplate;
  } else {
    console.error("Şablonları eklemek için hedef div bulunamadı.");
  }

  // Formu temizle
  document.getElementById("post-title").value = "";
  document.getElementById("category").value = "";
  fileInput.value = "";
  pdfInput.value = "";

  // Şablonlar sayfasına yönlendir
  window.location.href = "templates.html";
}
