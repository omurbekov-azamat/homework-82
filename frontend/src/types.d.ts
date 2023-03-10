export interface Artist {
    _id: string;
    name: string;
    image: string | null;
    information: string | null;
    isPublished: boolean;
}

export interface Album {
    _id: string;
    artist: {
        name: string;
    };
    image: string | null;
    name: string;
    releaseDate: string;
    isPublished: boolean;
}

export interface Track {
    _id: string;
    album: {
        artist: string;
        name: string;
    }
    duration: string | null;
    name: string;
    trackNumber: number;
    url: string;
    isPublished: boolean;
}

export interface AlbumId {
    album: Album[];
    artist: string;
    artistId: string;
    albumId: string;
}

export interface ArtistWithTrack {
    artist: Artist,
    tracks: Track[],
    album: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}


export interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export type GlobalError = {
    error: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface TrackHistoriesMutation {
    artist: {
        name: string;
        _id: string;
    },
    datetime: string;
    track: {
        name: string;
        _id: string;
    },
    user: string;
    _id: string;
}



export interface ArtistMutation {
    name: string;
    image: File | null;
    information: string;
}

export interface AlbumMutation {
    artist: string;
    name: string;
    releaseDate: string;
    image: File | null;
}

export interface TrackMutation {
    artist: string;
    album: string;
    name: string;
    duration: string;
    trackNumber: string;
    url: string;
}