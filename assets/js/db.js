// assets/js/db.js
const DB = {
    init() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([
                { username: 'admin', password: 'admin123' }
            ]));
        }
        if (!localStorage.getItem('courses')) {
            localStorage.setItem('courses', JSON.stringify([
                { id: 1, title: 'Math Class 10', price: 500 },
                { id: 2, title: 'Science Class 12', price: 700 }
            ]));
        }
        if (!localStorage.getItem('contacts')) {
            localStorage.setItem('contacts', JSON.stringify([]));
        }
        if (!localStorage.getItem('students')) {
            localStorage.setItem('students', JSON.stringify([]));
        }
    },

    get(table) {
        return JSON.parse(localStorage.getItem(table)) || [];
    },

    add(table, data) {
        const items = this.get(table);
        items.push(data);
        localStorage.setItem(table, JSON.stringify(items));
    }
};

DB.init(); // Initialize on load