import express from "express";
import mongoose from "mongoose";
import Track from "../modules/Track";
import {TrackMutation} from "../types";

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res, next) => {
    if (!req.body.album || !req.body.name || !req.body.trackNumber || !req.body.url) {
        return res.status(400).send({error: 'All fields are required'});
    }

    const trackData: TrackMutation = {
        album: req.body.album,
        name: req.body.name,
        duration: req.body.duration,
        trackNumber: req.body.trackNumber,
        url: req.body.url,
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
            const album = await Track.find({album: req.query.album}).populate('album');

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

export default tracksRouter;