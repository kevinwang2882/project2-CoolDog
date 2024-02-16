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

module.exports = {
    getSong,
    getSongById,
    createSong,
    updateSong,
    deleteSong
}

