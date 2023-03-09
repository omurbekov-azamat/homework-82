import {promises as fs} from 'fs';
import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../modules/Album";
import auth from "../middleware/auth";

const albumsRouter = express.Router();

albumsRouter.post('/', auth,  imagesUpload.single('image'), async (req, res, next) => {
    try {
        const album = await Album.create({
            artist: req.body.artist,
            name: req.body.name,
            releaseDate: parseFloat(req.body.releaseDate),
            image: req.file ? req.file.filename : null,
        });
        return res.send(album);
    } catch (e) {
        if (req.file) {
            await fs.unlink(req.file.path);
        }
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
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

            const artistAlbums = albums.sort((a, b) => {
                return a.releaseDate < b.releaseDate ? 1 : -1;
            });

            return res.send(artistAlbums);
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