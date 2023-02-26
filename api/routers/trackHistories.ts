import express from "express";
import {Error} from "mongoose";
import TrackHistory from "../modules/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";
import Album from "../modules/Album";
import {TrackHistoryMutation, TrackWithHistory} from "../types";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', auth, async (req, res, next) => {
    if (!req.body.track) {
        return res.status(400).send({error: 'All fields are required'});
    }
    const user = (req as RequestWithUser).user;
    try {
        const trackHistoryData: TrackHistoryMutation = {
            user: user.id,
            track: req.body.track,
            datetime: new Date().toISOString(),
        };

        const trackHistory = new TrackHistory(trackHistoryData);

        await trackHistory.save();
        return res.send(trackHistory);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

trackHistoriesRouter.get('/', auth, async (req, res) => {
    const user = (req as RequestWithUser).user;
    try {
        const result: TrackWithHistory[] = await TrackHistory.find({user: user.id}).populate('track');

        if (!result) {
            return res.status(404).send({error: 'Not found!'});
        }

        const idAlbums = [];
        const albums = [];
        const array = [];
        const trackHistory: TrackWithHistory[] = [...result];

        for (let i = 0; i < trackHistory.length; i++) {
            idAlbums.push(trackHistory[i].track.album);
        }

        for (let i = 0; i < idAlbums.length; i++) {
            const art = await Album.findById(idAlbums[i]).populate('artist');
            albums.push(art);
        }

        for (let i = 0; i < trackHistory.length; i++) {
            array.push({
                listenDatetime: trackHistory[i].datetime,
                track: trackHistory[i].track.name,
                artist: albums[i]?.artist,
                _id: trackHistory[i]._id,
            });
        }

        return res.send(array);
    } catch (error) {
        return res.status(404).send({error: 'Not found!'});
    }
});

export default trackHistoriesRouter;