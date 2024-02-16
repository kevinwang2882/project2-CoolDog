const mongoose = require('mongoose');
const { Schema } = mongoose;

const Song = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: [{ type: Schema.Types.ObjectId, ref: 'Album', required: true }]
    
},{ timestamps: true }
);

module.exports = Song
