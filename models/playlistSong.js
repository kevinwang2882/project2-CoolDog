const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaylistSong = new Schema({

    playlist_id: { type: Schema.Types.ObjectId, ref: 'Playlist', required: true },
    songs_id: [{ type: Schema.Types.ObjectId, ref: 'Song', required: true }]
},
{ timestamps: true });

module.exports =  PlaylistSong