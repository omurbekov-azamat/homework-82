import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createTrack, fetchTracksFromAlbumById} from "./tracksThunk";
import {Artist, Track, ValidationError} from "../../types";

interface TracksState {
    artist: Artist | null;
    tracks: Track[];
    album: string | null;
    fetchLoading: boolean;
    trackError: ValidationError | null;
    createTrackLoading: boolean;
}

const initialState: TracksState = {
    artist: null,
    tracks: [],
    album: null,
    fetchLoading: false,
    trackError: null,
    createTrackLoading: false,
};

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTracksFromAlbumById.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchTracksFromAlbumById.fulfilled, (state, {payload: data}) => {
            state.fetchLoading = false;
            state.artist = data.artist;
            state.album = data.album;
            state.tracks = data.tracks;
        });
        builder.addCase(fetchTracksFromAlbumById.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createTrack.pending, (state) => {
            state.trackError = null;
            state.createTrackLoading = true;
        });
        builder.addCase(createTrack.fulfilled, (state) => {
            state.createTrackLoading = false;
        });
        builder.addCase(createTrack.rejected, (state, {payload: error}) => {
            state.createTrackLoading = false;
            state.trackError = error || null;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectArtist = (state: RootState) => state.tracks.artist;
export const selectAlbum = (state: RootState) => state.tracks.album;
export const selectTracksFetching = (state: RootState) => state.tracks.fetchLoading;
export const selectCreateTrackLoading = (state: RootState) => state.tracks.createTrackLoading;
export const selectTrackError = (state: RootState) => state.tracks.trackError;