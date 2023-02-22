import {createSlice} from "@reduxjs/toolkit";
import {fetchArtists} from "./artistsThunk";
import {RootState} from "../../app/store";
import {Artist} from "../../types";

interface ArtistsState {
    artists: Artist[],
    fetchLoading: boolean,
}

const initialState: ArtistsState = {
    artists: [],
    fetchLoading: false,
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
    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;