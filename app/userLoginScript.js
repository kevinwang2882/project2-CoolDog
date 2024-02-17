

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
    window.location.href = 'login.html';
});

const signupButton = document.getElementById('signup-button');
signupButton.addEventListener('click', () => {
    window.location.href = 'signUp.html';
});

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const userName = localStorage.getItem('username');

function login() {
    // Perform login logic
    localStorage.setItem('isLoggedIn', 'true');
    updateButtons();
}


function logout() {
    // Perform logout logic
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    updateButtons();
}

function updateButtons() {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const logoutButton = document.getElementById('logout-button');
    const userNameElement = document.getElementById('user-name');

    if (isLoggedIn) {
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        logoutButton.style.display = ''; // Show logout button
        userNameElement.innerHTML = `<span style="color: white;">Welcome back  </span> <span style="color: red;">${ userName}</span>`;
        userNameElement.style.display = ''; // Show user's name
    } else {
        loginButton.style.display = '';
        signupButton.style.display = '';
        logoutButton.style.display = 'none'; // Hide logout button
        userNameElement.textContent = '';
        userNameElement.style.display = 'none'; // Hide user's name
    }
}

// Initial update
updateButtons();
document.getElementById('logout-button').addEventListener('click', () => {
    window.location.href = 'login.html';
});

const libraryButton = document.getElementById('library');
libraryButton.addEventListener('click', () => {
    fetch('library.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data; // Load content into 'content' element
        })
        .catch(error => {
            console.error('Error loading library:', error);
        });
});

