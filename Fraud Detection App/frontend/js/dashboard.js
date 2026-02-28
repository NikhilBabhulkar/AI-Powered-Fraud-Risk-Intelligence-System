// js/dashboard.js
// Handles sidebar navigation, tab switching, and auth protection

import { logout } from './auth.js';

function checkAuth() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = 'login.html';
  }
}

checkAuth();

const sidebar = document.getElementById('sidebar');
const navItems = sidebar.querySelectorAll('.nav li');
const mainContent = document.getElementById('main-content');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    if (item.id === 'logoutBtn') {
      window.logout();
      return;
    }
    loadTab(item.getAttribute('data-tab'));
  });
});

function loadTab(tab) {
  switch(tab) {
    case 'overview':
      import('./overview.js').then(m => m.render(mainContent));
      break;
    case 'singleCheck':
      import('./singleCheck.js').then(m => m.render(mainContent));
      break;
    case 'bulkAudit':
      import('./bulkAudit.js').then(m => m.render(mainContent));
      break;
    case 'evaluation':
      import('./evaluation.js').then(m => m.render(mainContent));
      break;
    case 'architecture':
      import('./architecture.js').then(m => m.render(mainContent));
      break;
    default:
      import('./overview.js').then(m => m.render(mainContent));
  }
}

// Initial load
loadTab('overview');
