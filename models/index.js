const mongoose = require('mongoose');

const songSchema = require('./song');
const playlistSchema = require('./playlist');
const albumSchema = require('./album');
const userSchema = require('./user');
const playlistSongSchema = require('./playlistSong');
const userPlaylistSchema = require('./userPlaylist');
const userSongSchema = require('./userSong');

const Album = mongoose.model('Album', albumSchema);
const Playlist = mongoose.model('Playlist', playlistSchema);
const Song = mongoose.model('Song', songSchema);
const User = mongoose.model('User', userSchema);
const PlaylistSong = mongoose.model('PlaylistSong', playlistSongSchema);
const UserPlaylist = mongoose.model('UserPlaylist', userPlaylistSchema);
const UserSong = mongoose.model('UserSong', userSongSchema);

module.exports = {
    Album,
    Playlist,
    Song,
    User,
    PlaylistSong,
    UserPlaylist,
    UserSong
};
