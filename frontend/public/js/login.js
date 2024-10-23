// frontend/public/js/login.js
document.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const contraseña = document.querySelector('#password').value;
  
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contraseña })
    });
  
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      window.location.href = '/home';
    } else {
      alert('Login fallido: ' + data.message);
    }
  });
  