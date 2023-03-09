import express from "express";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import TrackHistory from "../modules/TrackHistory";
import Track from "../modules/Track";
import artist from "../modules/Artist";
import {SaveTrackHistory} from "../types";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const track: SaveTrackHistory | null = await Track.findById(req.body.track)
            .populate({path: 'album', select: '_id', populate: {path: 'artist', select: '_id'}});

        if (!track) {
            return res.status(404).send({error: 'Not found!'});
        }

        const trackHistory = await TrackHistory.create({
            user: user.id,
            track: req.body.track,
            artist: track.album.artist._id,
            datetime: new Date().toISOString(),
        });
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
        const result = await TrackHistory.find({user: user.id})
            .populate({path: 'track', select: 'name'}).populate({path: 'artist', select: 'name'});

        if (!result) {
            return res.status(404).send({error: 'Not found!'});
        }

        const history = result.sort((a, b) => {
            return a.datetime < b.datetime ? 1 : -1;
        });
        return res.send(history);
    } catch (error) {
        return res.status(404).send({error: 'Not found!'});
    }
});

export default trackHistoriesRouter;