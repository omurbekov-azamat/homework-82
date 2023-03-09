import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createAlbum, fetchAlbumsById} from "./albumsThunk";
import {Album, ValidationError} from "../../types";

interface AlbumsState {
    albums: Album[];
    artist: string | null
    fetchLoading: boolean;
    albumError: ValidationError | null;
    createAlbumLoading: boolean;
}

const initialState: AlbumsState = {
    albums: [],
    artist: null,
    fetchLoading: false,
    albumError: null,
    createAlbumLoading: false,
};

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbumsById.pending, (state) => {
            state.albums = [];
            state.artist = null;
            state.fetchLoading = true;
        });
        builder.addCase(fetchAlbumsById.fulfilled, (state, {payload: data}) => {
            state.fetchLoading = false;
            state.albums = data.album;
            state.artist = data.artist;
        });
        builder.addCase(fetchAlbumsById.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createAlbum.pending, (state) => {
            state.albumError = null;
            state.createAlbumLoading = true;
        });
        builder.addCase(createAlbum.fulfilled, (state) => {
            state.createAlbumLoading = false;
        });
        builder.addCase(createAlbum.rejected, (state, {payload: error}) => {
            state.createAlbumLoading = false;
            state.albumError = error || null;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectArtistForAlbum = (state: RootState) => state.albums.artist;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;
export const selectCreateAlbumLoading = (state: RootState) => state.albums.createAlbumLoading;
export const selectAlbumError = (state: RootState) => state.albums.albumError;