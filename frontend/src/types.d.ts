export interface Artist {
    _id: string;
    name: string;
    image: string | null;
    information: string | null;
}

export interface Album {
    artist: {
        name: string;
    };
    image: string | null;
    name: string;
    releaseDate: string;
}