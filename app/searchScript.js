document.addEventListener('DOMContentLoaded', () => {
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));

    console.log(searchResults)
    if (searchResults) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = ''; // Clear previous results

        searchResults.forEach(item => {
            const resultElement = document.createElement('div');
         
                const songInfo= document.createElement('p');
                songInfo.innerHTML = `
                <h3>${item.title}</h3>
                <p>Artst: ${item.artist}</p>
            `;
            resultElement.appendChild(songInfo)
         
            const audioElement = document.createElement('audio');
            audioElement.controls = true; 
            audioElement.src = `http://localhost:3001/songs/${item.filePath}`; 
           
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
    console.log(isLoggedIn)
    if (!isLoggedIn) {
        alert("Please login to add the song to a playlist");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/playlists/${user_id}/addSong/${_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: _id })
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


document.getElementById("addToLibrary").addEventListener("click", async function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert("Please login to add the song to a library");
        return;
    }
    try {
        const response = await fetch(`http://localhost:3001/song/addSong/${songId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ songId: songId })
        });
        if (response.ok) {
            alert("Song added to library successfully");
        } else {
            alert("Failed to add song to library");
        }
    } catch (error) {
        console.error('Error adding song to library:', error);
        alert("An error occurred while adding the song to the library");
    }
});


    

