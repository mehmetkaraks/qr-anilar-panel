const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const popupOverlay = document.getElementById("popupOverlay");
const cancelButton = document.getElementById("cancelButton");

// Popup açma
openPopup.addEventListener("click", () => {
  popupOverlay.style.display = "block";
});

// Popup kapatma (X butonu)
closePopup.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

// Popup kapatma (Cancel butonu)
cancelButton.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

// Popup kapatma (overlay dışına tıklayınca)
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = "none";
  }
});
