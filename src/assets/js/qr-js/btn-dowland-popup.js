document.addEventListener("DOMContentLoaded", function () {
  // Açma işlemi
  document.querySelectorAll(".open-popup").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("popup").style.display = "block";
    });
  });

  // Kapatma işlemi
  document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
  });

  // Popup dışında bir yere tıklandığında kapat
  window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("popup")) {
      document.getElementById("popup").style.display = "none";
    }
  });
});
