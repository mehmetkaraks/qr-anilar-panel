const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Statik dosyalar için

// Kullanıcı kaydetme endpoint'i
app.post("/register", (req, res) => {
  const newUser = req.body;

  // JSON dosyasına ekleme
  fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Dosya okunamadı" });
    }

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ message: "Kullanıcı verileri okunamadı" });
    }

    const existingUser = users.find((user) => user.email === newUser.email);

    if (existingUser) {
      return res.status(400).json({ message: "Bu e-posta ile kayıtlı bir kullanıcı mevcut." });
    }

    users.push(newUser);

    fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Kayıt yapılamadı" });
      }
      res.status(200).json({ message: "Kullanıcı başarıyla kaydedildi" });
    });
  });
});

// Anasayfa için GET isteği
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Anasayfa dosyasının doğru yolu
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
