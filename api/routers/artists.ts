import { promises as fs } from 'fs';
import express from 'express';
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Artist from "../modules/Artist";

const artistsRouter = express.Router();

artistsRouter.post('/',  imagesUpload.single('image'), async (req, res, next) => {
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

export default artistsRouter;