import {Types, Schema, model} from 'mongoose';
import Album from "./Album";
import {TrackMutation} from "../types";

const TrackSchema = new Schema<TrackMutation>({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: {
            validator: async (value: Types.ObjectId) => Album.findById(value),
            message: 'Album does not exist',
        },
    },
    name: {
        type: String,
        required: true,
    },
    duration: String,
    trackNumber: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Track = model<TrackMutation>('Track', TrackSchema);
export default Track