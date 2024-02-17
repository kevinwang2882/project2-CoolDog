

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
    window.location.href = 'login.html';
});

const signupButton = document.getElementById('signup-button');
signupButton.addEventListener('click', () => {
    window.location.href = 'signUp.html';
});

const libraryButton = document.getElementById('library');
libraryButton.addEventListener('click', () => {
    window.location.href = 'login.html';
});

fetch('http://localhost:3001/playlists')
    .then(response => response.json())
    .then(data => {
        // Process the data received from the backend
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
    });
    const allMusicButton = document.getElementById('all-music');
allMusicButton.addEventListener('click', () => {
    fetch('allMusic.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data; // Load content into 'content' element
        })
        .catch(error => {
            console.error('Error loading all-music:', error);
        });
});