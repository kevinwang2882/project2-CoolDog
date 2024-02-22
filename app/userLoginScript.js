

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
    window.location.href = 'login.html';
});

const signupButton = document.getElementById('signup-button');
signupButton.addEventListener('click', () => {
    window.location.href = 'signUp.html';
});

const allMusicButton = document.getElementById('all-music');
allMusicButton.addEventListener('click', () => {
    window.location.href = 'allMusic.html';
});

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const username = localStorage.getItem('username');

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
        userNameElement.innerHTML = `<span style="color: white;">Welcome back  </span> <span style="color: red;">${ username}</span>`;
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

const libraryButton = document.getElementById('library-button');
const playlistButton = document.getElementById('playlist-button');
const albumButton = document.getElementById('album-button');
const songButton = document.getElementById('song-button');

let buttonsVisible = false;

if (libraryButton) {
    libraryButton.addEventListener('click', () => {
        if (buttonsVisible) {
            // Hide all buttons
            playlistButton.style.display = 'none';
            albumButton.style.display = 'none';
            songButton.style.display = 'none';
        } else {
            // Show all buttons
            playlistButton.style.display = '';
            albumButton.style.display = '';
            songButton.style.display = '';
        }

        // Toggle visibility flag
        buttonsVisible = !buttonsVisible;
    });
} else {
    console.error('Library button not found.');
}







// const libraryButton = document.getElementById('library');
// const buttonsContainer = document.getElementById('library-buttons-container');
// let buttonsAppended = false; // Flag to track if buttons have been appended

// libraryButton.addEventListener('click', () => {
//     if (!buttonsAppended) {
//         const buttons = [
//             { text: 'Playlists', id: 'playlist-button' },
//             { text: 'Albums', id: 'album-button' },
//             { text: 'Songs', id: 'song-button' }
//         ];

//         buttons.forEach(button => {
//             const buttonElement = document.createElement('button');
//             buttonElement.textContent = button.text;
//             buttonElement.id = button.id;
//             buttonsContainer.appendChild(buttonElement);
//         });

//         buttonsAppended = true; // Set flag to true to indicate buttons have been appended
//     }
// });



const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const searchTypes = document.getElementById('search-type');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim(); // Get the search query
    const type = searchTypes.value; // Get the selected search type

    if (query) {
        fetch(`http://localhost:3001/search/${type}?q=${encodeURIComponent(query)}`) // Encode the query parameter
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('searchResults', JSON.stringify(data)); // Store the search results in localStorage
                window.location.href = 'search.html'; // Redirect to the search results page
            })
            .catch(error => {
                console.error('Error searching for music:', error);
            });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Your code here
    const playlistButton = document.getElementById('playlist-button');
    if (playlistButton) {
        playlistButton.addEventListener('click', () => {
            window.location.href = 'playlist.html'; // Redirect to the playlist page
        });
    }
});


window.onload = function() {
    const images = document.querySelectorAll('#imageshow img');
    const bulletsContainer = document.querySelector('.bullets');
    let currentImage = 0;

    images[currentImage].style.opacity = 1;

    images.forEach((image, index) => {
        const bullet = document.createElement('span');
        bullet.classList.add('bullet');
        if (index === currentImage) {
            bullet.classList.add('active');
        }
        bullet.addEventListener('click', () => {
            images[currentImage].style.opacity = 0;
            images[index].style.opacity = 1;
            document.querySelector('.bullet.active').classList.remove('active');
            bullet.classList.add('active');
            currentImage = index;
        });
        bulletsContainer.appendChild(bullet);
    });

    function imageShow() {
        setInterval(() => {
            images[currentImage].style.opacity = 0;
            currentImage = (currentImage + 1) % images.length;
            images[currentImage].style.opacity = 1;
            document.querySelector('.bullet.active').classList.remove('active');
            bulletsContainer.children[currentImage].classList.add('active');
        }, 10000); // Change interval to 10 seconds
    }

    imageShow();
}

