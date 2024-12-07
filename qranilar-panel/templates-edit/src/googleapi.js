const { google } = require("googleapis");
const fs = require("fs");

// Kimlik bilgilerini yükle
const credentials = JSON.parse(fs.readFileSync("path/to/credentials.json"));
const SCOPES = ["https://www.googleapis.com/auth/documents"];

async function createGoogleDoc() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  const docs = google.docs({ version: "v1", auth });

  // Yeni bir doküman oluştur
  const newDoc = await docs.documents.create({
    requestBody: {
      title: "Yeni Doküman",
    },
  });

  console.log(`Doküman oluşturuldu: ${newDoc.data.documentId}`);
}

createGoogleDoc().catch((err) => console.error("Hata:", err));
