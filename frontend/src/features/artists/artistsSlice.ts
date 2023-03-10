import {createSlice} from "@reduxjs/toolkit";
import {createArtist, deleteSinger, fetchArtists, publishSinger} from "./artistsThunk";
import {RootState} from "../../app/store";
import {Artist, ValidationError} from "../../types";

interface ArtistsState {
    artists: Artist[],
    fetchLoading: boolean,
    artistError: ValidationError | null;
    createArtistLoading: boolean;
    deleteArtistLoading: string | false;
    publishArtistLoading: string | false;
}

const initialState: ArtistsState = {
    artists: [],
    fetchLoading: false,
    artistError: null,
    createArtistLoading: false,
    deleteArtistLoading: false,
    publishArtistLoading: false,
};

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
            state.fetchLoading = false;
            state.artists = artists;
        });
        builder.addCase(fetchArtists.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createArtist.pending, (state) => {
            state.artistError = null;
            state.createArtistLoading = true;
        });
        builder.addCase(createArtist.fulfilled, (state) => {
            state.createArtistLoading = false;
        });
        builder.addCase(createArtist.rejected, (state, {payload: error}) => {
            state.createArtistLoading = false;
            state.artistError = error || null;
        });
        builder.addCase(deleteSinger.pending, (state, {meta}) => {
            state.deleteArtistLoading = meta.arg;
        });
        builder.addCase(deleteSinger.fulfilled, (state) => {
            state.deleteArtistLoading = false;
        });
        builder.addCase(deleteSinger.rejected, (state) => {
            state.deleteArtistLoading = false;
        });
        builder.addCase(publishSinger.pending, (state,{meta}) => {
            state.publishArtistLoading = meta.arg;
        });
        builder.addCase(publishSinger.fulfilled, (state) => {
            state.publishArtistLoading = false;
        });
        builder.addCase(publishSinger.rejected, (state) => {
            state.publishArtistLoading = false;
        });
    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;
export const selectCreateArtistLoading = (state: RootState) => state.artists.createArtistLoading;
export const selectArtistError = (state: RootState) => state.artists.artistError;
export const selectDeleteArtistLoading = (state: RootState) => state.artists.deleteArtistLoading;
export const selectPublishArtistLoading = (state: RootState) => state.artists.publishArtistLoading;