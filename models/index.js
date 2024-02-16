const mongoose = require('mongoose')

const songSchema = require('./song')
const playlistSchema = require('./playlist')
const albumSchema = require('./album')
const userSchema = require('./user')

const Album  = mongoose.model('Album ', albumSchema )
const Playlist = mongoose.model('Playlist', playlistSchema)
const Song = mongoose.model('Song', songSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
    Album,
    Playlist,
    Song,
    User
}