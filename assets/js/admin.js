// DOM Elements
const DOM = {
    // Login Page
    loginForm: document.getElementById('loginForm'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    btnText: document.getElementById('btnText'),
    spinner: document.getElementById('spinner'),
    
    // Dashboard
    logoutBtn: document.getElementById('logoutBtn'),
    totalStudents: document.getElementById('totalStudents'),
    totalCourses: document.getElementById('totalCourses'),
    totalMessages: document.getElementById('totalMessages'),
    recentActivity: document.getElementById('recentActivity')
};

// Auth State
const Auth = {
    isAuthenticated() {
        return localStorage.getItem('authToken') !== null;
    },
    
    login(username, password) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' && password === 'admin123') {
                    localStorage.setItem('authToken', 'demo-token-123');
                    localStorage.setItem('user', JSON.stringify({
                        username: 'admin',
                        name: 'Admin User'
                    }));
                    resolve(true);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 800); // Simulate network delay
        });
    },
    
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }
};

// Data Service
const DataService = {
    getStats() {
        return {
            students: localStorage.getItem('students') 
                ? JSON.parse(localStorage.getItem('students')).length 
                : 0,
            courses: localStorage.getItem('courses') 
                ? JSON.parse(localStorage.getItem('courses')).length 
                : 0,
            messages: localStorage.getItem('messages') 
                ? JSON.parse(localStorage.getItem('messages')).length 
                : 0
        };
    },
    
    getRecentActivity() {
        // Simulate data
        return [
            {
                id: 1,
                type: 'registration',
                title: 'New student registration',
                time: '2 minutes ago',
                icon: 'user'
            },
            {
                id: 2,
                type: 'payment',
                title: 'Payment received',
                time: '1 hour ago',
                icon: 'dollar'
            },
            {
                id: 3,
                type: 'message',
                title: 'New contact message',
                time: '3 hours ago',
                icon: 'message'
            }
        ];
    }
};

// UI Helpers
const UI = {
    showLoading(button) {
        button.disabled = true;
        DOM.btnText.textContent = 'Authenticating...';
        DOM.spinner.style.display = 'block';
    },
    
    hideLoading(button) {
        button.disabled = false;
        DOM.btnText.textContent = 'Sign In';
        DOM.spinner.style.display = 'none';
    },
    
    showError(message) {
        alert(message);
    },
    
    renderStats() {
        const stats = DataService.getStats();
        DOM.totalStudents.textContent = stats.students;
        DOM.totalCourses.textContent = stats.courses;
        DOM.totalMessages.textContent = stats.messages;
    },
    
    renderActivity() {
        const activities = DataService.getRecentActivity();
        let html = '';
        
        activities.forEach(activity => {
            html += `
            <div class="activity-item">
                <div class="activity-icon">
                    <svg><use href="#icon-${activity.icon}"></use></svg>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
            `;
        });
        
        DOM.recentActivity.innerHTML = html;
    }
};

// Event Listeners
const setupEventListeners = () => {
    // Login Form
    if (DOM.loginForm) {
        DOM.loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            UI.showLoading(e.target.querySelector('button'));
            
            try {
                await Auth.login(DOM.username.value, DOM.password.value);
                window.location.href = 'dashboard.html';
            } catch (error) {
                UI.hideLoading(e.target.querySelector('button'));
                UI.showError(error.message);
            }
        });
    }
    
    // Logout Button
    if (DOM.logoutBtn) {
        DOM.logoutBtn.addEventListener('click', () => {
            Auth.logout();
            window.location.href = 'login.html';
        });
    }
};

// Initialize App
const init = () => {
    setupEventListeners();
    
    // If on dashboard page
    if (DOM.totalStudents) {
        UI.renderStats();
        UI.renderActivity();
    }
    
    // Protect admin routes
    if (window.location.pathname.includes('/admin/') && 
        !window.location.pathname.includes('/login.html') && 
        !Auth.isAuthenticated()) {
        window.location.href = 'login.html';
    }
};

// Start the app
document.addEventListener('DOMContentLoaded', init);