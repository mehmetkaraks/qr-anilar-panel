document.addEventListener("DOMContentLoaded", function () {
  const registerButtons = document.querySelectorAll(".registerButton");

  registerButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const name = button.closest(".card-body").querySelector('input[type="text"]').value;
      const email = button.closest(".card-body").querySelector('input[type="email"]').value;
      const password = button.closest(".card-body").querySelector('input[type="password"]:nth-of-type(1)').value;
      const confirmPassword = button.closest(".card-body").querySelector('input[type="password"]:nth-of-type(2)').value;

      if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Lütfen tüm alanları doldurun!");
        return;
      }

      if (password !== confirmPassword) {
        alert("Şifreler uyuşmuyor!");
        return;
      }

      const userData = {
        name: name,
        email: email,
        password: password,
      };

      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
            if (data.message === "Kullanıcı başarıyla kaydedildi") {
              window.location.href = "auth-boxed-signin.html"; // Giriş sayfasına yönlendir
            }
          }
        })
        .catch((error) => {
          console.error("Hata:", error);
          alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin."); // Kullanıcıya hata mesajı
        });
    });
  });
});
