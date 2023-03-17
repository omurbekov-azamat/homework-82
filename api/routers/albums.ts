import {promises as fs} from 'fs';
import express from "express";
import mongoose, {HydratedDocument} from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../modules/Album";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import Track from "../modules/Track";
import User from "../modules/User";
import artist from "../modules/Artist";
import {AlbumMutation} from "../types";

const albumsRouter = express.Router();

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const album = await Album.create({
            artist: req.body.artist,
            name: req.body.name,
            releaseDate: parseFloat(req.body.releaseDate),
            image: req.file ? req.file.filename : null,
        });
        return res.send(album);
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

albumsRouter.get('/', async (req, res, next) => {
    const token = req.get('Authorization');
    if (req.query.artist) {
        try {
            if (!token) {
                const album = await Album.find({isPublished: true, artist: req.query.artist}).populate('artist');
                if (!album) {
                    return res.status(404).send({error: 'Album is not found'});
                }
                return res.send(album);
            }

            const user = await User.findOne({token});

            if (!user) {
                return res.status(401).send({error: 'Wrong token!'});
            }

            if (user.role === 'user') {
                const album = await Album.find({isPublished: true, artist: req.query.artist}).populate('artist');
                if (!album) {
                    return res.status(404).send({error: 'Album is not found'});
                }
                return res.send(album);
            }

            if (user.role === 'admin') {
                const album = await Album.find({artist: req.query.artist}).populate('artist');
                if (!album) {
                    return res.status(404).send({error: 'Album is not found'});
                }
                return res.send(album);
            }
        } catch (e) {
            return res.status(404).send({error: 'Not Found!'});
        }
    } else {
        try {
            if (!token) {
                const albums = await Album.find({isPublished: true});
                if (!albums) {
                    return res.status(404).send({error: 'Albums is not found'});
                }
                return res.send(albums);
            }

            const user = await User.findOne({token});

            if (!user) {
                return res.status(401).send({error: 'Wrong token!'});
            }

            if (user.role === 'user') {
                const albums = await Album.find({isPublished: true});
                if (!albums) {
                    return res.status(404).send({error: 'Albums is not found'});
                }
                return res.send(albums);
            }

            if (user.role === 'admin') {
                const albums = await Album.find();
                if (!albums) {
                    return res.status(404).send({error: 'Albums is not found'});
                }
                return res.send(albums);
            }
        } catch (e) {
            return next(e);
        }
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    const token = req.get('Authorization');
    try {
        if (!token) {
            const album = await Album.find({isPublished: true, _id: req.params.id}).populate('artist');
            if (!album) {
                return res.status(404).send({error: 'Album is not found'});
            }
            return res.send(album);
        }

        const user = await User.findOne({token});

        if (!user) {
            return res.status(401).send({error: 'Wrong token!'});
        }

        if (user.role === 'user') {
            const album = await Album.find({isPublished: true, _id: req.params.id}).populate('artist');
            if (!album) {
                return res.status(404).send({error: 'Album is not found'});
            }
            return res.send(album);
        }

        if (user.role === 'admin') {
            const album = await Album.findById(req.params.id).populate('artist');
            if (!album) {
                return res.status(404).send({error: 'Album is not found'});
            }
            return res.send(album);
        }
    } catch (e) {
        return next(e);
    }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).send({error: 'Album is not found'});
        }

        await Album.deleteOne(album._id);
        await Track.deleteMany({album: album._id});

        res.send({message: "Delete was successfully!"});
    } catch (e) {
        return next(e);
    }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    const album: HydratedDocument<AlbumMutation> | null = await Album.findById(req.params.id);

    if (!album) {
        return res.status(404).send({error: 'Artist is not found'});
    }

    album.isPublished = !album.isPublished;

    try {
        await album.save();
        return res.send({message: 'isPublished successfully changed!', album});
    } catch (e) {
        return next(e);
    }
});

export default albumsRouter;