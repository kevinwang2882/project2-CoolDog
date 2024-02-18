document.addEventListener('DOMContentLoaded', () => {
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));

    if (searchResults) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = ''; // Clear previous results

        searchResults.forEach(song => {
            const songElement = document.createElement('div');
            songElement.textContent = `${song.title} - ${song.artist}`;

            const audioElement = document.createElement('audio');
            audioElement.controls = true; // Show audio controls
            audioElement.src = `http://localhost:3001/songs/${song.filePath}`; // Set the audio source to the file path

            songElement.appendChild(audioElement);
            resultsContainer.appendChild(songElement);
        });

        localStorage.removeItem('searchResults'); // Remove the search results from localStorage
    } else {
        // Handle case where there are no search results
    }
});
