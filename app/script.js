

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
const fetchRecommendedPlaylists = async () => {
    try {
        const response = await fetch('http://localhost:3001/playlists');
        if (!response.ok) {
            throw new Error('Failed to fetch recommended playlists');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recommended playlists:', error);
        return [];
    }
};

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

