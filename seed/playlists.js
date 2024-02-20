const db = require('../db');
const { User, Song, Playlist } = require('../models');

const main = async () => {
    try {
        // Find the user user1
        const user1 = await User.findOne({ username: 'john_doe' });

        // Find the songs by their titles and map them to their IDs
        const songs = await Song.find({ title: { $in: ['Highway to Hell', 'Money', 'Billie Jean', 'Shape of You', 'Uptown Funk', 'Happy', 'Bohemian Rhapsody', 'Sicko Mode', 'Gods Plan', 'Stairway to Heaven', 'Hotel California','Lose Yourself'] } });
        const songIdMap = songs.reduce((acc, song) => {
            acc[song.title] = song._id;
            return acc;
        }, {});

        // Update the playlists with the correct user ID and song IDs
        const playlists = [
            {
                name: 'Rock Classics',
                user_id: user1._id,
                songs: [songIdMap['Highway to Hell']]
            },
            {
                name: 'All-Time Favorites',
                user_id: user1._id,
                songs: [songIdMap['Money'], songIdMap['Billie Jean']]
            },
            {
                name: 'Pop Hits',
                user_id: user1._id,
                songs: [songIdMap['Shape of You'], songIdMap['Uptown Funk'], songIdMap['Happy']]
            },
            {
                name: 'Rock Anthems',
                user_id: user1._id,
                songs: [songIdMap['Bohemian Rhapsody'], songIdMap['Stairway to Heaven'], songIdMap['Hotel California']]
            },
            {
                name: 'Rap & Hip Hop',
                user_id: user1._id,
                songs: [songIdMap['Sicko Mode'], songIdMap['Gods Plan'], songIdMap['Lose Yourself']]
            }
        ];

        // Save the playlists to the database
        await Playlist.insertMany(playlists);
        console.log('Playlists added successfully:', playlists);
    } catch (err) {
        console.error('Error inserting playlists:', err);
    } finally {
        // Close the database connection after all operations are completed
        db.close();
    }
};

main(); // Call the main function to start the insertion process
