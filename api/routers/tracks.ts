import express from "express";
import mongoose from "mongoose";
import Track from "../modules/Track";
import Album from "../modules/Album";
import {TrackMutation} from "../types";

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res, next) => {
    if (!req.body.album || !req.body.name) {
        return res.status(400).send({error: 'Album and name is required'});
    }

    const trackData: TrackMutation = {
        album: req.body.album,
        name: req.body.name,
        duration: req.body.duration,
    };

    const track = new Track(trackData);

    try {
        await track.save();
        return res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            next(e);
        }
    }
});

tracksRouter.get('/', async (req, res, next) => {
    if (req.query.album) {
        try {
            const album = await Track.find({album: req.query.album});

            if (!album) {
                return res.status(404).send({error: 'Not found'});
            }

            return res.send(album);
        } catch (e) {
            return res.status(404).send({error: 'Not found'});
        }
    }
    try {
        const tracks = await Track.find();
        return res.send(tracks);
    } catch (e) {
        return next(e);
    }
});

tracksRouter.get('/:id', async (req, res) => {
    try {
        const albums = await Album.find({artist: req.params.id});

        if (!albums) {
            return res.status(404).send({error: 'Not found'});
        }

        const idAlbums = [];

        const array = [...albums];

        for (let i = 0; i < array.length; i++) {
            idAlbums.push(array[i]._id);
        }

        const test = await Track.find({album: idAlbums}).populate('album');

        return res.send(test);
    } catch (e) {
        return res.status(404).send({error: 'Not found'});
    }
});

export default tracksRouter;