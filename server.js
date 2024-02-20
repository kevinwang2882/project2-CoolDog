
const express = require('express');
const db = require('./db');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { searchAlbum,getAlbum, getAlbumById, createAlbum, updateAlbum, deleteAlbum } = require('./controllers/albumController');
const {saveNewPlaylist,searchUserPlaylist, searchPlaylist ,getPlaylist, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist } = require('./controllers/playlistController');
const {searchSong,getSong, getSongById, createSong, updateSong, deleteSong} = require('./controllers/songController');
const { getUsers, getUserById, createUser, updateUser, deleteUser, userSignUp,userLogin, } = require('./controllers/userController');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

//middleware here
app.use(cors()) //Necessary for some HTTP methods while working on local network
app.use(bodyParser.json()) //Allows you to use the body of requests
app.use(logger('dev')) //Better logs

//Set up and homepage
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

app.get('/', async (req,res) => {
    res.send("Welcome to music webplayer!")
})

app.get('/albums', getAlbum)
app.post('/albums/create', createAlbum)
app.get('/albums/:id', getAlbumById)
app.put('/albums/:id/update', updateAlbum)
app.delete('/albums/:id/delete', deleteAlbum)

app.get('/playlists', getPlaylist)
app.post('/playlists/create', createPlaylist)
app.get('/playlists/:id', getPlaylistById)
app.put('/playlists/:id/update', updatePlaylist)
app.delete('/playlists/:id/delete', deletePlaylist)

app.use('/songs/music', express.static(path.join(__dirname, 'music')));
app.get('/songs', getSong)
app.post('/songs/create', createSong)
app.get('/songs/:id', getSongById)
app.put('/songs/:id/update', updateSong)
app.delete('/songs/:id/delete', deleteSong)

app.get('/users', getUsers)
app.post('/users/create', createUser)
app.get('/users/:id', getUserById)
app.put('/users/:id/update', updateUser)
app.delete('/users/:id/delete', deleteUser)

app.get('/search/song', searchSong)
app.get('/search/album', searchAlbum)
app.get('/search/playlist', searchPlaylist)
app.get('/search/user/playlist', searchUserPlaylist)

//for sign up
app.post('/users/signup', userSignUp)
//for login
app.post('/users/login', userLogin)

// app.post('/playlists', saveNewPlaylist)
app.post('/playlists', (req, res) => {
    res.send('Playlist created successfully');
})

// Handle 404 errors
app.get('/*', async (req,res) => {
    res.send('An error has occurred. Try again later (404)')
})
