// assets/js/auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Login Page Fix
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault(); // This stops the page refresh
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('username', username);
                window.location.href = 'dashboard.html'; // Redirect after successful login
            } else {
                alert('Invalid credentials!');
            }
        });
    }
    
    // Rest of your auth.js code...
});
    
    // Logout Button
    if (document.getElementById('logoutBtn')) {
        document.getElementById('logoutBtn').addEventListener('click', function() {
            sessionStorage.removeItem('loggedIn');
            window.location.href = '../index.html';
        });
    }
    
    // Protect Admin Pages
    if (window.location.pathname.includes('/admin/')) {
        if (!sessionStorage.getItem('loggedIn')) {
            window.location.href = 'login.html';
        }
    // Add to auth.js
if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', function() {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        window.location.href = 'login.html';
    });
}
}