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