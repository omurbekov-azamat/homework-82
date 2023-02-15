export interface ArtistMutation {
    name: string;
    image: string | null;
    information: string;
}

export interface AlbumMutation {
    artist: string;
    name: string;
    date: string;
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