import {ObjectId} from "mongoose";

export interface ArtistMutation {
    name: string;
    image: string | null;
    information: string;
}

export interface AlbumMutation {
    artist: ObjectId;
    name: string;
    releaseDate: number;
    image: string | null;
}

export interface TrackMutation {
    album: ObjectId;
    name: string;
    duration: string;
    trackNumber: number;
    url: string;
}

export interface IUser {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface TrackHistoryMutation {
    user: ObjectId;
    track: ObjectId;
    artist: ObjectId;
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