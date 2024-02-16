const db = require('../db');
const {Album} = require('../models');

const main = async () => {
    try {
        const albums = [
            {
                title: 'Back in Black',
                artist: 'AC/DC' 
            },
            {
                title: 'The Dark Side of the Moon', 
                artist: 'Pink Floyd'
            },
            {
                title: 'Thriller', 
                artist: 'Michael Jackson'
            },
        ];

        await Album.insertMany(albums);
        console.log('Albums added successfully!');
        db.close(); // Close the database connection after inserting albums
    } catch (err) {
        console.error('Error inserting albums:', err);
    }
};

main(); // Call the main function to start the insertion process
