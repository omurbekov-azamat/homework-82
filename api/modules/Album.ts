import {Types, model, Schema} from 'mongoose';
import Artist from "./Artist";
import {AlbumMutation} from "../types";

const AlbumSchema = new Schema<AlbumMutation>({
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Artist.findById(value),
            message: 'Artist does not exist',
        },
    },
    name: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Number,
        required: true,
    },
    image: String,
});

const Album = model<AlbumMutation>('Album', AlbumSchema);

export default Album;