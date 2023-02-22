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