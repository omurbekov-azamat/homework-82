import express from "express";
import mongoose from "mongoose";
import Album from "../modules/Album";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";

const albumsRouter = express.Router();

albumsRouter.post('/', imagesUpload.single('images'), async (req, res, next) => {
    if (!req.body.artist || !req.body.name || !req.body.releaseDate) {
        return res.status(400).send({error: 'All fields are required'});
    }

    const albumData: AlbumMutation = {
        artist: req.body.artist,
        name: req.body.name,
        releaseDate: Number(req.body.releaseDate),
        image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);

    try {
        await album.save();
        return res.send(album);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            next(e);
        }
    }
});

albumsRouter.get('/', async (req, res, next) => {
    if (req.query.artist) {
        try {
            const albums = await Album.find({artist: req.query.artist}).populate('artist');

            if (!albums) {
                return res.status(404).send({error: 'Not Found!'});
            }
            return res.send(albums);

        } catch (e) {
            return res.status(404).send({error: 'Not Found!'});
        }
    } else {
        try {
            const albums = await Album.find();
            return res.send(albums);
        } catch (e) {
            return next(e);
        }
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
   try {
       const result = await Album.findById(req.params.id).populate('artist');

       if (!result) {
           return res.status(404).send({error: 'Not found!'});
       }

       return res.send(result);
   } catch (e) {
       return next(e);
   }
});

export default albumsRouter;