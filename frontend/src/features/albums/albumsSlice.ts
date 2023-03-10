import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createAlbum, deleteAlbum, fetchAlbumsById, publishAlbum} from "./albumsThunk";
import {Album, ValidationError} from "../../types";

interface AlbumsState {
    albums: Album[];
    artist: string | null;
    artistId: string | null;
    albumId: string | null;
    fetchLoading: boolean;
    albumError: ValidationError | null;
    createAlbumLoading: boolean;
    deleteAlbumLoading: false | string;
    publishAlbumLoading: false | string;
}

const initialState: AlbumsState = {
    albums: [],
    artist: null,
    artistId: null,
    albumId: null,
    fetchLoading: false,
    albumError: null,
    createAlbumLoading: false,
    deleteAlbumLoading: false,
    publishAlbumLoading: false,
};

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbumsById.pending, (state) => {
            state.albums = [];
            state.artist = null;
            state.artistId = null;
            state.albumId = null;
            state.fetchLoading = true;
        });
        builder.addCase(fetchAlbumsById.fulfilled, (state, {payload: data}) => {
            state.fetchLoading = false;
            state.albums = data.album;
            state.artist = data.artist;
            state.artistId = data.artistId;
            state.albumId = data.albumId;
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
        builder.addCase(deleteAlbum.pending, (state, {meta}) => {
            state.deleteAlbumLoading = meta.arg;
        });
        builder.addCase(deleteAlbum.fulfilled, (state) => {
            state.deleteAlbumLoading = false;
        });
        builder.addCase(deleteAlbum.rejected, (state) => {
            state.deleteAlbumLoading = false;
        });
        builder.addCase(publishAlbum.pending, (state, {meta}) => {
            state.publishAlbumLoading = meta.arg;
        });
        builder.addCase(publishAlbum.fulfilled, (state) => {
            state.publishAlbumLoading = false;
        });
        builder.addCase(publishAlbum.rejected, (state) => {
            state.publishAlbumLoading = false;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectArtistForAlbum = (state: RootState) => state.albums.artist;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;
export const selectCreateAlbumLoading = (state: RootState) => state.albums.createAlbumLoading;
export const selectAlbumError = (state: RootState) => state.albums.albumError;
export const selectDeleteAlbumLoading = (state: RootState) => state.albums.deleteAlbumLoading;
export const selectPublishAlbumLoading = (state: RootState) => state.albums.publishAlbumLoading;
export const selectArtistId = (state: RootState) => state.albums.artistId;
export const selectAlbumId = (state: RootState) => state.albums.albumId;