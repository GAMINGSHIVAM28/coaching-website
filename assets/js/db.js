// Database operations using localStorage
const STORAGE_KEY = 'coaching_center_registrations';

/**
 * Save a new registration to localStorage
 * @param {Object} registrationData - The student registration data
 * @returns {Object} - The saved registration with ID and timestamp
 */
function saveRegistration(registrationData) {
    try {
        // Get existing registrations or initialize empty array
        const registrations = getAllRegistrations();
        
        // Create new registration object with additional metadata
        const newRegistration = {
            id: Date.now().toString(), // Simple unique ID
            ...registrationData,
            timestamp: new Date().toISOString()
        };
        
        // Add to array and save back to localStorage
        registrations.push(newRegistration);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
        
        return newRegistration;
    } catch (error) {
        console.error('Error saving registration:', error);
        throw new Error('Failed to save registration');
    }
}

/**
 * Retrieve all registrations from localStorage
 * @returns {Array} - Array of all registrations
 */
function getAllRegistrations() {
    try {
        const registrationsJson = localStorage.getItem(STORAGE_KEY);
        return registrationsJson ? JSON.parse(registrationsJson) : [];
    } catch (error) {
        console.error('Error retrieving registrations:', error);
        return [];
    }
}

/**
 * Delete a registration by ID
 * @param {string} id - The ID of the registration to delete
 */
function deleteRegistration(id) {
    try {
        let registrations = getAllRegistrations();
        registrations = registrations.filter(reg => reg.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
    } catch (error) {
        console.error('Error deleting registration:', error);
        throw new Error('Failed to delete registration');
    }
}

// Export functions for use in other files
// Note: In a real module system, we'd use export/import
// For this static implementation, these functions are globally available