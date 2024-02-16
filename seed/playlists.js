const db = require('../db');

const {User,Song,Playlist} = require('../models');


const main = async () => {
    try {
        // Find the user user1
        const user1 = await User.findOne({ user_name: 'john_doe' });

        // Find the songs by their titles and map them to their IDs
        const songs = await Song.find({ title: { $in: ['Highway to Hell', 'Money', 'Billie Jean'] } });
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
        ];

        // Save the playlists to the database
        await Playlist.insertMany(playlists);
        console.log('Playlists added successfully:', playlists);
        db.close(); // Close the database connection after inserting playlists
    } catch (err) {
        console.error('Error inserting playlists:', err);
    }
};

main(); // Call the main function to start the insertion process
