import {promises as fs} from 'fs';
import express from 'express';
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Artist from "../modules/Artist";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import Album from "../modules/Album";

const artistsRouter = express.Router();

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const artist = await Artist.create({
            name: req.body.name,
            image: req.file ? req.file.filename : null,
            information: req.body.information,
        });
        return res.send(artist);
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

artistsRouter.get('/', async (req, res) => {
    if (req.query.artist) {
        try {
            const artist = await Artist.findById(req.query.artist);

            if (!artist) {
                return res.status(404).send({error: 'Not found'});
            }
            return res.send(artist);
        } catch (e) {
            return res.status(404).send({error: 'Not found'});
        }
    }
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
        return res.sendStatus(500);
    }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({error: 'Artist is not found'});
        }

        const album = await Album.find({artist: artist._id});

        if (!album) {
            await Artist.deleteOne(artist._id);
            return res.send({message: "Delete was successfully!"});
        }

        return res.status(404).send({error: 'Artist have albums and tracks u can not delete!'})
    } catch (e) {
        return next(e);
    }
});

export default artistsRouter;