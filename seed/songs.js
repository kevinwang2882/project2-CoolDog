const db = require('../db');
const { Song, Album } = require('../models');





db.once('open', async () => {
    try {
        const albums = await Album.find();
        // Use albums to map album titles to their corresponding _id values
        const albumIdMap = albums.reduce((acc, album) => {
            acc[album.title] = album._id;
            return acc;
        }, {});

        const songs = [
            { title: 'Highway to Hell', 
              artist: 'AC/DC',
              album: albumIdMap['Back in Black'], 
              filePath: 'music/Billie Jean.mp3'
            },
            { title: 'Money', 
              artist: 'Pink Floyd', 
              album: albumIdMap['The Dark Side of the Moon'], 
              filePath: 'Money.mp3'
            },
            { title: 'Billie Jean', 
              artist: 'Michael Jackson',
              album: albumIdMap['Thriller'], 
              filePath: 'Billie Jean.mp3'
            }
        ];

        // Save the songs to the database
        await Song.insertMany(songs);
        console.log('Songs added successfully:', songs);
    } catch (err) {
        console.error('Error inserting songs:', err);
    } finally {
        db.close(); // Close the database connection
    }
});
