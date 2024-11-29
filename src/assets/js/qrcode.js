document.addEventListener("DOMContentLoaded", function () {
  const user_email = document.querySelector(".user-email");
  const user_password = document.querySelector(".user-password"); // Changed from phone to password
  const generateCodeButton = document.querySelector(".generate-qr-code");
  let qrImage = document.querySelector(".qr-image");
  const loading = document.querySelector(".loading");

  generateCodeButton.onclick = async () => {
    qrImage.src = "";
    let email = user_email.value;
    let password = user_password.value;

    // Generate a unique identifier for each album link
    let uniqueId = Math.floor(Math.random() * 100000);

    let albumLink = `https://qranilar.com.tr/dashboard/album/event${uniqueId}`;
    let userData = `Email: ${email} Password: ${password} Album Link: ${albumLink}`;
    let imgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(userData)}`;

    loading.style.display = "block";

    if (name != "" || email != "" || password != "") {
      let response = await fetch(imgSrc);
      let data = await response.blob();

      qrImage.src = URL.createObjectURL(data);
      loading.style.display = "none";
    } else {
      alert("Please enter valid field data!!!");
      loading.style.display = "none";
    }

    URL.revokeObjectURL(data);
  };
});
