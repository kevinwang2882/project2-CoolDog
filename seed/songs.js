const db = require('../db');
const {Song,Album } = require('../models');

const main = async () => {
    try {
        const albums = await Album.find();
        // Use albums to map album titles to their corresponding _id values
        const albumIdMap = albums.reduce((acc, album) => {
            acc[album.title] = album._id;
            return acc;
        }, {});

        const songs = [
            {   title: 'Highway to Hell', 
                artist: 'AC/DC', 
                album: albumIdMap['Back in Black'] },
            {   title: 'Money', 
                artist: 'Pink Floyd', 
                album: albumIdMap['The Dark Side of the Moon'] },
            {   title: 'Billie Jean', 
                artist: 'Michael Jackson', 
                album: albumIdMap['Thriller'] }
        ];

        // Save the songs to the database
        await Song.insertMany(songs);
        console.log('Songs added successfully:', songs);
    } catch (err) {
        console.error('Error inserting songs:', err);
    }
};

const run = async () => {
    await main();
    db.close();
};

run();
