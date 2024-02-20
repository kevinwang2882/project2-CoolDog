const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if username and password meet minimum length requirements
    if (username.length < 6 || password.length < 6) {
        window.alert('Username and password must be at least 6 characters long.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3001/users/signup', { username, password });
        console.log('Sign Up successful:', response.data);

        // Redirect to login page after successful sign up
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Sign Up failed:', error.response.data);
    }
});
