// Sample user data (this would come from a backend)
const users = {
    admin: { username: 'admin', password: 'admin123' },
    user: { username: 'user', password: 'user123' }
};

function handleLogin(event) {
    event.preventDefault();
    
    const role = document.getElementById('roleSelect').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic form validation
    if (!role || !username || !password) {
        showError('Please fill in all fields!');
        return false;
    }
    
    // Check credentials (simplified for demo)
    if (users[role].username === username && users[role].password === password) {
        // Store login state (in backend, use proper authentication tokens)
        sessionStorage.setItem('loggedInRole', role);
        sessionStorage.setItem('username', username);
        
        // Redirect to appropriate dashboard
        window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
    } else {
        showError('Invalid credentials');
    }
    
    return false;
}

function showError(message) {
    // Create error message element if it doesn't exist
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        document.querySelector('.login-card').insertBefore(
            errorDiv,
            document.querySelector('form')
        );
    }
    
    // Show error message with fade effect
    errorDiv.textContent = message;
    errorDiv.style.opacity = '1';
    
    // Hide error message after 3 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => {
            errorDiv.remove();
        }, 300);
    }, 3000);
}

// Check if user is already logged in
window.addEventListener('load', () => {
    const loggedInRole = sessionStorage.getItem('loggedInRole');
    if (loggedInRole) {
        window.location.href = loggedInRole === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
    }
});