const mongoose = require('mongoose');
const { Schema } = mongoose;

const Playlist = new Schema({
    name: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song', required: true }]
},
{ timestamps: true });

module.exports =  Playlist
