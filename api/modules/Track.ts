import mongoose, {Types} from 'mongoose';
import Album from "./Album";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
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
});

const Track = mongoose.model('Track', TrackSchema);
export default Track