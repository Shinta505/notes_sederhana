// register.js
document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const gender = document.getElementById('gender').value;
  const password = document.getElementById('password').value;

  const registerMessage = document.getElementById('registerMessage');

  // Validasi sederhana (bisa ditambah sesuai kebutuhan)
  if (!name || !email || !gender || !password) {
    registerMessage.textContent = 'Semua field harus diisi.';
    registerMessage.style.color = 'red';
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Jika perlu token, bisa ditambahkan di sini, tapi biasanya register tidak butuh
      },
      body: JSON.stringify({
        name,
        email,
        gender,
        password
      })
    });

    if (response.ok) {
      const data = await response.json();
      registerMessage.textContent = 'Registrasi berhasil! Silakan login.';
      registerMessage.style.color = 'green';
      // Bisa redirect ke login page setelah beberapa detik misal:
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      // Jika ada error dari server, tangkap pesan errornya
      const errorData = await response.json();
      registerMessage.textContent = errorData.message || 'Registrasi gagal.';
      registerMessage.style.color = 'red';
    }
  } catch (error) {
    registerMessage.textContent = 'Terjadi kesalahan jaringan atau server.';
    registerMessage.style.color = 'red';
  }
});
