// assets/js/main.js
function navigateTo(page) {
    window.location.href = page;
}

function renderCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    let html = '';
    courses.forEach(course => {
        html += `
        <div class="course-card">
            <h3>${course.title}</h3>
            <p>Price: ₹${course.price}</p>
            <button onclick="registerForCourse(${course.id})">Register</button>
        </div>
        `;
    });
    document.getElementById('courses-container').innerHTML = html;
}