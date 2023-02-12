import express from "express";
import mongoose from "mongoose";
import Track from "../modules/Track";
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

export default tracksRouter;