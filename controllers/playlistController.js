const { Playlist } = require('../models')

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

module.exports = {
    getPlaylist,
    getPlaylistById,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
}