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
}

export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface TrackHistoryMutation {
    user: string;
    track: string;
    datetime: string;
}