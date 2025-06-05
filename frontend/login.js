// login.js

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const loginMessage = document.getElementById("loginMessage");

  loginMessage.textContent = "";
  loginMessage.style.color = "black";

  try {
    console.log("Mengirim request login ke backend...");
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // biar cookie refreshToken bisa diterima
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);

    const data = await response.json();

    console.log("Response body:", data);

    if (response.ok) {
      loginMessage.style.color = "green";
      loginMessage.textContent = data.message || "Login Successful";
      localStorage.setItem("accessToken", data.accessToken);
      // Redirect ke dashboard
      console.log("Login berhasil, redirect ke dashboard...");
      window.location.href = "dashboard.html";
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = data.message || "Login failed";
    }
  } catch (error) {
    console.error("Terjadi error saat fetch:", error);
    loginMessage.style.color = "red";
    loginMessage.textContent = "Terjadi kesalahan koneksi. Cek console untuk detail.";
  }
});
