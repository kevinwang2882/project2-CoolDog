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
            {   title: 'A Night at the Opera', 
                artist: 'Queen' },

             {  title: 'Rumours',
                artist: 'Fleetwood Mac' },

             { title: 'Born to Run', 
               artist: 'Bruce Springsteen' },

              { title: 'Hotel California', 
                artist: 'Eagles' },

              { title: 'The Wall',
                artist: 'Pink Floyd' },

              { title: 'The White Album', 
                artist: 'The Beatles' },

              { title: 'Kind of Blue', 
                artist: 'Miles Davis' },

              { title: 'Divide',
                artist: 'Ed Sheeran' },

              { title: 'Stairway to Heaven', 
                artist: 'Led Zeppelin' },

              { title: 'Uptown Special', 
                artist: 'Mark Ronson' },

               { title: 'Happy', 
                artist: 'Pharrell Williams' }, 

                { title: 'A Night at the Opera', 
                artist: 'Queen' }, 

                { title: 'ASTROWORLD', 
                artist: 'Travis Scott' }, 

                { title: 'Scorpion', 
                artist: 'Drake' }, 

                { title: '8 Mile Soundtrack', 
                artist: 'Eminem' }, 

                { title: 'Happy', 
                artist: 'Pharrell Williams' }, 

                { title: 'ASTROWORLD', 
                artist: 'Travis Scott' }, 

                { title: 'Happy', 
                artist: 'Pharrell Williams' }, 



        ];

        await Album.insertMany(albums);
        console.log('Albums added successfully!');
        db.close(); // Close the database connection after inserting albums
    } catch (err) {
        console.error('Error inserting albums:', err);
    }
};

main(); // Call the main function to start the insertion process
