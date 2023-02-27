import {model, Schema, Types} from "mongoose";
import User from "./User";
import Track from "./Track";
import Artist from "./Artist";
import Album from "./Album";
import {TrackHistoryMutation} from "../types";

const TrackHistorySchema = new Schema<TrackHistoryMutation>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Track.findById(value),
            message: 'Track does not exist',
        },
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Artist.findById(value),
            message: 'Artist does not exist',
        },
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Album.findById(value),
            message: 'Album does not exist',
        },
    },
    datetime: {
        type: String,
        required: true,
    }
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);
export default TrackHistory;
