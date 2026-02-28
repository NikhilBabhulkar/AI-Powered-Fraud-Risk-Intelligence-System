// js/auth.js
// Handles login, logout, and session management

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = '';

  if (!username || !password) {
    errorMsg.textContent = 'Please enter both username and password.';
    return;
  }

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('authToken', data.token);
      window.location.href = 'dashboard.html';
    } else {
      errorMsg.textContent = data.error || 'Invalid credentials.';
    }
  } catch (err) {
    errorMsg.textContent = 'Server error. Please try again.';
  }
});

window.logout = function() {
  localStorage.removeItem('authToken');
  window.location.href = 'login.html';
};
