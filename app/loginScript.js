const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // if (username.length < 6 || password.length < 6) {
    //     window.alert('Username and password must be at least 6 characters long.');
    //     return;
    // }
    try {
        const response = await axios.post('http://localhost:3001/users/login', { username, password });
        console.log('Login successful:', response.data);
       
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', response.data.user_id);
        // Redirect to d home page on successful login
        window.location.href = 'userLogin.html';
    } catch (error) {
        console.error('Login failed:', error.response.data);
    }
});

