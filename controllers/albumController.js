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

const searchAlbum = async (req, res) => {
    const query = req.query.q; // Get the search query from the request
    try {
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const albums = await Album.find({ title: { $regex: query, $options: 'i' } }); // Use regex to perform a case-insensitive search
        res.json(albums); // Return the matching songs as JSON
    } catch (error) {
        console.error('Error searching for albums:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAlbum,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    searchAlbum
}