const playlistButton = document.getElementById('playlist');
playlistButton.addEventListener('click', () => {
    fetch('http://localhost:3001/playlists')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById('playlist-container');
        data.forEach(item => {
            const listItem = document.createElement('div');
            const songNames = item.songs.map(songId => {
                return fetch(`http://localhost:3001/songs/${songId}`)
                    .then(response => response.json())
                    .then(songData => songData.title)
                    .catch(error => {
                        console.error('Error fetching song data:', error);
                        return 'Unknown Song';
                    });
            });

            Promise.all(songNames).then(songs => {
                listItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Songs: ${songs.join(', ')}</p>
                `;
                dataContainer.appendChild(listItem);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});


const songButton = document.getElementById('song');
songButton.addEventListener('click', () => {
    fetch('http://localhost:3001/songs')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById('song-container');
        data.forEach(item => {
            // Fetch album name using album ID
            fetch(`http://localhost:3001/albums/${item.album}`)
            .then(response => response.json())
            .then(albumData => {
                const listItem = document.createElement('div');
                listItem.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>Artst: ${item.artist}</p>
                    <p>Album: ${albumData.title}</p>
                `;
                const audioElement = document.createElement('audio');
                audioElement.controls = true; // Show audio controls
                audioElement.src = `http://localhost:3001/songs/${item.filePath}`; // Set the audio source to the file path

                dataContainer.appendChild(audioElement);
                dataContainer.appendChild(listItem);
            })
            .catch(error => {
                console.error('Error fetching album data:', error);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
})


const albumButton = document.getElementById('album');
albumButton.addEventListener('click', () => {
    fetch('http://localhost:3001/albums')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById('album-container');
        data.forEach(item => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <h3>${item.title}</h3>
                <p>Artist: ${item.artist}</p>
            `;
            dataContainer.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
