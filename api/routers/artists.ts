import express from 'express';
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Artist from "../modules/Artist";
import {ArtistMutation} from "../types";

const artistsRouter = express.Router();

artistsRouter.post('/',  imagesUpload.single('image'), async (req, res, next) => {

    if (!req.body.name) {
        return res.status(400).send({error: 'Name field is required'});
    }

    const artistData: ArtistMutation = {
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        information: req.body.information,
    };

    const artist = new Artist(artistData);

    try {
        await artist.save();
        return res.send(artist);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            next(e);
        }
    }
});

artistsRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
        return res.sendStatus(500);
    }
});

export default artistsRouter;