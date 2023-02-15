import express from "express";
import {Error} from "mongoose";
import User from "../modules/User";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({error: 'All fields are required'});
    }
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        await user.save();
        return res.send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default usersRouter;