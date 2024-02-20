document.addEventListener('DOMContentLoaded', () => {
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));

    if (searchResults) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = ''; // Clear previous results
    
        searchResults.forEach(item => {
            const resultElement = document.createElement('div');
            if (item.type === 'song') {
                resultElement.textContent = `${item.title} - ${item.artist} (Song)`;
            } else if (item.type === 'playlist') {
                resultElement.textContent = `${item.name} (Playlist)`;
            } else if (item.type === 'album') {
                resultElement.textContent = `${item.title} - ${item.artist} (Album)`;
            }
    
            const audioElement = document.createElement('audio');
            audioElement.controls = true; // Show audio controls
            audioElement.src = `http://localhost:3001/songs/${item.filePath}`; // Set the audio source to the file path
    
            resultElement.appendChild(audioElement);
            resultsContainer.appendChild(resultElement);
        });
    
        localStorage.removeItem('searchResults'); // Remove the search results from localStorage
    } else {
        // Handle case where there are no search results
    }
});

document.getElementById("addToPlaylist").addEventListener("click", async function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert("Please login to add the song to a playlist");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/playlists/${playlistId}/addSong/${songId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ songId: songId })
        });
        if (response.ok) {
            alert("Song added to playlist successfully");
        } else {
            alert("Failed to add song to playlist");
        }
    } catch (error) {
        console.error('Error adding song to playlist:', error);
        alert("An error occurred while adding the song to the playlist");
    }
});


document.getElementById("addToLibrary").addEventListener("click", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert("Please login to add the song to a playlist");
        return;
    }
    

    alert("Added to library");
});
