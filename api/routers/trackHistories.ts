import express from "express";
import {Error} from "mongoose";
import TrackHistory from "../modules/TrackHistory";
import User from "../modules/User";
import {TrackHistoryMutation} from "../types";


const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', async (req, res, next) => {
    if (!req.body.track) {
        return res.status(400).send({error: 'All fields are required'});
    }

    try {
        const token = req.get('Authorization');

        if (!token) {
            return res.status(401).send({error: 'No token present'});
        }

        const user = await User.findOne({token});

        if (!user) {
            return res.status(401).send({error: 'Wrong token!'});
        }

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

export default trackHistoriesRouter;