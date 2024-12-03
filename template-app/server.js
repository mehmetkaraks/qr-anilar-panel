const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

// Yükleme klasörünü ayarla
const upload = multer({
  dest: "uploads/", // Dosyalar bu klasöre yüklenecek
});

// Statik dosyaları sunmak için
app.use(express.static(path.join(__dirname, "public")));

// Basit bir dosya yükleme API'si
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Dosya yüklenmedi!");
  }

  // Yüklenen dosyanın URL'si
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, fileUrl });
});

// Sunucu çalıştır
app.listen(3000, () => {
  console.log("Sunucu http://localhost:3000 adresinde çalışıyor");
});
