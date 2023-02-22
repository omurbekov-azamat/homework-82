import {createSlice} from "@reduxjs/toolkit";

interface ArtistsState {
    artists: [],
}

const initialState: ArtistsState = {
    artists: [],
};

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
});

export const artistsReducer = artistsSlice.reducer;