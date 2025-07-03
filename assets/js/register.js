document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                course: document.getElementById('course').value
            };
            
            try {
                // Save to localStorage
                saveRegistration(formData);
                
                // Show success message
                registrationForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Reset form (for when they come back)
                registrationForm.reset();
            } catch (error) {
                alert('There was an error saving your registration. Please try again.');
                console.error('Registration error:', error);
            }
        }
    });
    
    // Real-time validation for fields
    document.getElementById('firstName').addEventListener('blur', validateFirstName);
    document.getElementById('lastName').addEventListener('blur', validateLastName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('course').addEventListener('change', validateCourse);
});

// Form validation functions
function validateForm() {
    return (
        validateFirstName() &&
        validateLastName() &&
        validateEmail() &&
        validatePhone() &&
        validateCourse()
    );
}

function validateFirstName() {
    const firstName = document.getElementById('firstName').value.trim();
    const errorElement = document.getElementById('firstNameError');
    
    if (!firstName) {
        errorElement.textContent = 'First name is required';
        return false;
    }
    
    if (firstName.length < 2) {
        errorElement.textContent = 'First name must be at least 2 characters';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateLastName() {
    const lastName = document.getElementById('lastName').value.trim();
    const errorElement = document.getElementById('lastNameError');
    
    if (!lastName) {
        errorElement.textContent = 'Last name is required';
        return false;
    }
    
    if (lastName.length < 2) {
        errorElement.textContent = 'Last name must be at least 2 characters';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const errorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        errorElement.textContent = 'Email is required';
        return false;
    }
    
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Please enter a valid email address';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validatePhone() {
    const phone = document.getElementById('phone').value.trim();
    const errorElement = document.getElementById('phoneError');
    const phoneRegex = /^[\d\s\-()+]{10,}$/; // Basic international phone validation
    
    if (!phone) {
        errorElement.textContent = 'Phone number is required';
        return false;
    }
    
    // Remove all non-digit characters for length check
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (digitsOnly.length < 10) {
        errorElement.textContent = 'Phone number must be at least 10 digits';
        return false;
    }
    
    if (!phoneRegex.test(phone)) {
        errorElement.textContent = 'Please enter a valid phone number';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateCourse() {
    const course = document.getElementById('course').value;
    const errorElement = document.getElementById('courseError');
    
    if (!course) {
        errorElement.textContent = 'Please select a course';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}