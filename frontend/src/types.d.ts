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