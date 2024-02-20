const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserPlaylist= new Schema({

    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    songs_id: [{ type: Schema.Types.ObjectId, ref: 'Song', required: true }]
},
{ timestamps: true });

module.exports = UserPlaylist