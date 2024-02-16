const mongoose = require('mongoose');
const { Schema } = mongoose;

const Album = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true }
},
{ timestamps: true });

module.exports =  Album
