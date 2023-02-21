import express from "express";
import {Error} from "mongoose";
import TrackHistory from "../modules/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";
import {TrackHistoryMutation} from "../types";


const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/',  auth,async (req, res, next) => {
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

export default trackHistoriesRouter;