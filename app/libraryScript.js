



const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const addPlaylistForm = document.getElementById('add-playlist-form');
const playlistsContainer = document.getElementById('playlists-container');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim().toLowerCase();
    const username = localStorage.getItem('username');
    if (!username) {
        console.error('Username not found. Please login.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/search/user/playlist?userId=${username}&name=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to search playlists');
        }
        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error('Error searching playlists:', error);
    }
});

addPlaylistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const playlistName = document.getElementById('playlist-name').value.trim();
    const username = localStorage.getItem('username');
    if (!username) {
        console.error('Username not found. Please login.');
        return;
    }
    if (!playlistName) {
        console.error('Playlist name is required');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: playlistName, username: username })
        });
        if (!response.ok) {
            throw new Error('Failed to add playlist');
        }
        console.log('Playlist added successfully');
        // Update UI with the new playlist without fetching all playlists again
        const newPlaylist = { username: username, name: playlistName }; // Assume you have an _id for the new playlist
        renderPlaylist(newPlaylist);
        // Reset the form
        addPlaylistForm.reset();
    } catch (error) {
        console.error('Error adding playlist:', error);
    }
});

allMusicButton.addEventListener('click', () => {
    fetch('playlist.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data; // Load content into 'content' element
        })
        .catch(error => {
            console.error('Error loading all-music:', error);
        });
});





function renderPlaylist(playlist) {
    const playlistElement = document.createElement('div');
    playlistElement.textContent = playlist.name;
    playlistsContainer.appendChild(playlistElement);
}

