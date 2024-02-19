

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

    const allMusicButton = document.getElementById('all-music');
allMusicButton.addEventListener('click', () => {
    fetch('allMusic/allMusic.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data; // Load content into 'content' element
        })
        .catch(error => {
            console.error('Error loading all-music:', error);
        });
});

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
