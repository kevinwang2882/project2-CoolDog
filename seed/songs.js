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
          { 
            title: 'Highway to Hell', 
            artist: 'AC/DC',
            album: albumIdMap['Back in Black'], 
            filePath: 'music/Highway_to_Hell.mp3'
        },
        { 
            title: 'Money', 
            artist: 'Pink Floyd', 
            album: albumIdMap['The Dark Side of the Moon'], 
            filePath: 'music/Money.mp3'
        },
        { 
            title: 'Billie Jean', 
            artist: 'Michael Jackson',
            album: albumIdMap['Thriller'], 
            filePath: 'music/Billie Jean.mp3'
        },
        { 
            title: 'Hotel California', 
            artist: 'Eagles',
            album: albumIdMap['Hotel California'], 
            filePath: 'music/Hotel California.mp3'
        },
            { title: 'Stairway to Heaven', 
              artist: 'Led Zeppelin' ,
              album: albumIdMap['Led Zeppelin IV'], 
              filePath: 'music/Stairway to Heaven.mp3'
          },
             { title: 'Shape of You', 
               artist: 'Ed Sheeran' ,
               album: albumIdMap['Divide'], 
               filePath: 'music/Shape of You.mp3'
      },
             { title: 'Uptown Funk', 
              artist: 'Mark Ronson' ,
              album: albumIdMap['Uptown Special'], 
             filePath: 'music/Uptown Funk.mp3'
},
            { title: 'Happy', 
              artist: 'Pharrell Williams,' ,
             album: albumIdMap['G I R L'], 
             filePath: 'music/Happy.mp3'
},          
             { title: 'Bohemian Rhapsody', 
              artist: 'Queen' ,
              album: albumIdMap['A Night at the Opera'], 
              filePath: 'music/Bohemian Rhapsody.mp3'
          },

          { title: 'Sicko Mode', 
          artist: 'Travis Scott' ,
          album: albumIdMap['ASTROWORLD'], 
          filePath: 'music/Sicko Mode.mp3'
      },
         { title: 'Gods Plan', 
           artist: 'Drake' ,
           album: albumIdMap['Scorpion'], 
          filePath: 'music/Gods Plan.mp3'
    },
          { title: 'Lose Yourself', 
           artist: 'Eminem' ,
           album: albumIdMap['8 Mile Soundtrack'], 
          filePath: 'music/Lose Yourself.mp3'
},
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
