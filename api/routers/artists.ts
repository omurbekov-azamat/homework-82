import express from 'express';
import {ArtistMutation} from "../types";
import {imagesUpload} from "../multer";
import Artist from "../modules/Artist";
import mongoose from "mongoose";

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
            return res.sendStatus(400).send(e);
        } else {
            next(e);
        }
    }
});

export default artistsRouter;