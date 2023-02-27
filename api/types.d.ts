import {ObjectId} from "mongoose";

export interface ArtistMutation {
    name: string;
    image: string | null;
    information: string;
}

export interface AlbumMutation {
    artist: string;
    name: string;
    releaseDate: number;
    image: string | null;
}

export interface TrackMutation {
    album: string;
    name: string;
    duration: string;
    trackNumber: string;
}

export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface TrackHistoryMutation {
    user: ObjectId;
    track: ObjectId;
    artist: ObjectId;
    album: ObjectId;
    datetime: string;
}

export interface SaveTrackHistory {
    album: {
        artist: {
            _id: ObjectId;
        },
        _id: ObjectId;
    }
}