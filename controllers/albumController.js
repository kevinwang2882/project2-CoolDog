const {Album}  = require('../models')

const getAlbum = async (req, res) => {
    try {
        const albums = await Album.find().populate()
        res.json(albums)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getAlbumById = async (req,res) => {
    try {
        const album = await Album.findById(req.params.id).populate()
        if (album) {
            res.json(album)
        }
    } catch (error) {
        return res.status(500).send('Collection with the specified ID does not exists');
    }
}

const createAlbum = async (req,res) => {
    try {
        const album = await new Album(req.body)
        await album.save()
        return res.status(201).json({
            album,
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateAlbum = async (req, res) => {
    try {
        let { id } = req.params;
        let album = await Album.findByIdAndUpdate(id, req.body, { new: true })
        if (album) {
            return res.status(200).json(album)
        }
        throw new Error("Album not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Album.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Album deleted");
        }
        throw new Error("Album not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAlbum,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
}