import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchTracksFromAlbumById} from "./tracksThunk";
import {Artist, Track} from "../../types";

interface TracksState {
    artist: Artist | null;
    tracks: Track[];
    album: string | null;
    fetchLoading: boolean;
}

const initialState: TracksState = {
    artist: null,
    tracks: [],
    album: null,
    fetchLoading: false,
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
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectArtist = (state: RootState) => state.tracks.artist;
export const selectAlbum = (state: RootState) => state.tracks.album;
export const selectTracksFetching = (state: RootState) => state.tracks.fetchLoading;