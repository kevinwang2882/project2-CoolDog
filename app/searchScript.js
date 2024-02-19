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
