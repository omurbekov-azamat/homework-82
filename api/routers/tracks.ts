import {promises as fs} from 'fs';
import express from "express";
import mongoose, {HydratedDocument} from "mongoose";
import Track from "../modules/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import {TrackMutation} from "../types";
import User from "../modules/User";

const tracksRouter = express.Router();

tracksRouter.post('/', auth, async (req, res, next) => {
    try {
        const track = await Track.create({
            album: req.body.album,
            name: req.body.name,
            duration: req.body.duration,
            trackNumber: req.body.trackNumber,
            url: req.body.url,
        });
        return res.send(track);
    } catch (e) {
        if (req.file) {
            await fs.unlink(req.file.path);
        }
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

tracksRouter.get('/', async (req, res, next) => {
    const token = req.get('Authorization');
    if (req.query.album) {
        try {
            if (!token) {
                const tracks = await Track.find({isPublished: true, album: req.query.album}).populate('album');
                if (!tracks) {
                    return res.status(404).send({error: 'Tracks are not found'});
                }
                return res.send(tracks);
            }

            const user = await User.findOne({token});

            if (!user) {
                return res.status(401).send({error: 'Wrong token!'});
            }

            if (user.role === 'user') {
                const tracks = await Track.find({isPublished: true, album: req.query.album}).populate('album');
                if (!tracks) {
                    return res.status(404).send({error: 'Tracks are not found'});
                }
                return res.send(tracks);
            }

            if (user.role === 'admin') {
                const tracks = await Track.find({album: req.query.album}).populate('album');
                if (!tracks) {
                    return res.status(404).send({error: 'Tracks are not found'});
                }
                return res.send(tracks);
            }
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

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            return res.status(404).send({error: 'Track is not found'});
        }

        await Track.deleteOne(track._id);

        res.send({message: "Delete was successfully!"});
    } catch (e) {
        return next(e);
    }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    const track: HydratedDocument<TrackMutation> | null = await Track.findById(req.params.id);

    if (!track) {
        return res.status(404).send({error: 'Artist is not found'});
    }

    track.isPublished = !track.isPublished;

    try {
        await track.save();
        return res.send({message: 'isPublished successfully changed!', track});
    } catch (e) {
        return next(e);
    }
});

export default tracksRouter;