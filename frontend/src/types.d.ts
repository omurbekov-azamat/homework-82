export interface Artist {
    _id: string;
    name: string;
    image: string | null;
    information: string | null;
}

export interface Album {
    _id: string;
    artist: {
        name: string;
    };
    image: string | null;
    name: string;
    releaseDate: string;
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
}

export interface AlbumId {
    album: Album[];
    artist: string;
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