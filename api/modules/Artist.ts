import {Schema, model,} from 'mongoose';
import {ArtistMutation} from "../types";


const ArtistSchema = new Schema<ArtistMutation>({
    name: {
        type: String,
        required: true,
    },
    image: String,
    information: String,
});

const Artist = model<ArtistMutation>('Artist', ArtistSchema);
export default Artist;