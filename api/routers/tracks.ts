import {promises as fs} from 'fs';
import express from "express";
import mongoose from "mongoose";
import Track from "../modules/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

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
    if (req.query.album) {
        try {
            const album = await Track.find({album: req.query.album}).populate('album');

            if (!album) {
                return res.status(404).send({error: 'Not found'});
            }

            const tracks = album.sort((a, b) => {
                return a.trackNumber < b.trackNumber ? -1 : 1;
            });

            return res.send(tracks);
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

export default tracksRouter;