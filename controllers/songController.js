const { Song } = require('../models')

const getSong = async (req, res) => {
    try {
        const songs = await Song.find().populate()
        res.json(songs)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getSongById = async (req,res) => {
    try {
        const song = await Song.findById(req.params.id).populate()
        if (song) {
            res.json(song)
        }
    } catch (error) {
        return res.status(500).send('Collection with the specified ID does not exists');
    }
}

const createSong = async (req,res) => {
    try {
        const song = await new Song(req.body)
        await song.save()
        return res.status(201).json({
            song,
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateSong = async (req, res) => {
    try {
        let { id } = req.params;
        let song = await Song.findByIdAndUpdate(id, req.body, { new: true })
        if (song) {
            return res.status(200).json(song)
        }
        throw new Error("Song not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Song.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Song deleted");
        }
        throw new Error("Song not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const searchSong = async (req, res) => {
    const query = req.query.q; // Get the search query from the request
    try {
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const song = await Song.find({ title: { $regex: query, $options: 'i' } }); // Use regex to perform a case-insensitive search
 
        res.json(song); // Return the matching songs as JSON
    } catch (error) {
        console.error('Error searching for songs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addSongToLibrary = async (req, res) => {
    try {
        const { songId } = req.params;
        const { userId } = req.body;

        // Check if the user already has this song in their library
        const existingUserSong = await UserSong.findOne({ userId, songId });
        if (existingUserSong) {
            return res.status(400).json({ error: 'Song already exists in the library' });
        }

        // Create a new UserSong document and save it to the database
        const newUserSong = new UserSong({ userId, songId });
        await newUserSong.save();

        res.status(200).json({ message: 'Song added to library successfully' });
    } catch (error) {
        console.error('Error adding song to library:', error);
        return res.status(500).json({ error: 'Failed to add song to library' });
    }
}


module.exports = {
    getSong,
    getSongById,
    createSong,
    updateSong,
    deleteSong,
    searchSong,
    addSongToLibrary

}

