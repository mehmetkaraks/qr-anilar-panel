document.getElementById("file-input").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    alert("Dosya seçildi: " + file.name);
    // Burada dosyayı servera yükleme kodlarını ekleyebilirsiniz.
  }
});
