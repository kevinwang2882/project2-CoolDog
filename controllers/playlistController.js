const { Playlist,UserPlaylist } = require('../models')

const getPlaylist = async (req, res) => {
    try {
        const playlists = await Playlist.find().populate()
        res.json(playlists)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getPlaylistById = async (req,res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate()
        if (playlist) {
            res.json(playlist)
        }
    } catch (error) {
        return res.status(500).send('Collection with the specified ID does not exists');
    }
}

const createPlaylist = async (req,res) => {
    try {
        const playlist = await new Playlist(req.body)
        await playlist.save()
        return res.status(201).json({
            playlist,
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updatePlaylist = async (req, res) => {
    try {
        let { id } = req.params;
        let playlist = await Playlist.findByIdAndUpdate(id, req.body, { new: true })
        if (playlist) {
            return res.status(200).json(playlist)
        }
        throw new Error("Playlist not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Playlist.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Playlist deleted");
        }
        throw new Error("Playlist not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const searchPlaylist = async (req, res) => {
    const query = req.query.q; // Get the search query from the request
    try {
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const playlists = await Playlist.find({ name: { $regex: query, $options: 'i' } }); // Use regex to perform a case-insensitive search
        res.json(playlists); // Return the matching playlist as JSON
    } catch (error) {
        console.error('Error searching for playlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const searchUserPlaylist = async (req, res) => {
    const userId = req.query.userId;
    const nameQuery = req.query.name;

    try {
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        let playlists;
        if (nameQuery) {
            playlists = await Playlist.find({ userId, name: { $regex: nameQuery, $options: 'i' } });
        } else {
            playlists = await Playlist.find({ userId });
        }

        res.json(playlists); // Return the matching playlists as JSON
    } catch (error) {
        console.error('Error searching for user playlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const saveNewPlaylist = async (req,res) => {
    const { playlistId, userId } = req.body;
    if (playlistId || !userId) {
        return res.status(400).json({ error: 'Name and username are required' });
    }

    try {
        const playlist = new UserPlaylist({ playlistId, userId });
        await playlist.save();
        res.status(201).json({ message: 'Playlist created successfully', playlist });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create playlist' });
    }
};






module.exports = {
    getPlaylist,
    getPlaylistById,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    searchPlaylist,
    searchUserPlaylist,
    saveNewPlaylist,
   
}