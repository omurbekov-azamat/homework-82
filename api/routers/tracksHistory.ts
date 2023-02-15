import express from "express";
import {Error} from "mongoose";
import TrackHistory from "../modules/TrackHistory";
import {TrackHistoryMutation} from "../types";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    if (!req.body.user || !req.body.track) {
        return res.status(400).send({error: 'All fields are required'});
    }
    try {
        const trackHistoryData: TrackHistoryMutation = {
            user: req.body.user,
            track: req.body.track,
            datetime: new Date().toString(),
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

export default trackHistoryRouter;