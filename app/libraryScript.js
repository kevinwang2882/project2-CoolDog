



const playlistButton = document.getElementById('playlist');
playlistButton.addEventListener('click', () => {
    fetch('playlist.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data; // Load content into 'content' element
        })
        .catch(error => {
            console.error('Error loading playlist:', error);
        });
});


