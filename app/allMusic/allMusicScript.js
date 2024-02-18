

fetch('http://localhost:3001/playlists')
.then(response => response.json())
.then(data => {
    const dataContainer = document.getElementById('data-container');
    data.forEach(item => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>ID: ${item.user_id}</p>
            <p>Songs: ${item.songs.join(', ')}</p>
        `;
        dataContainer.appendChild(listItem);
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});

fetch('http://localhost:3001/songs')
.then(response => response.json())
.then(data => {
    const dataContainer = document.getElementById('data-container');
    data.forEach(item => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>Artst: ${item.artist}</p>
            <p>Album: ${item.album.join(', ')}</p>
        `;
        dataContainer.appendChild(listItem);
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});

fetch('http://localhost:3001/albums')
.then(response => response.json())
.then(data => {
    const dataContainer = document.getElementById('data-container');
    data.forEach(item => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>Artst: ${item.artist}</p>

        `;
        dataContainer.appendChild(listItem);
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});