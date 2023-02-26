import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {playTrack} from "./trackHistoriesThunks";

interface TrackHistoriesState {
    playTrack: boolean;
}

const initialState: TrackHistoriesState = {
    playTrack: false,
}

export const trackHistoriesSlice = createSlice({
    name: 'trackHistories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(playTrack.pending, (state) => {
            state.playTrack = true;
        });
        builder.addCase(playTrack.fulfilled, (state) => {
            state.playTrack = false;
        });
        builder.addCase(playTrack.rejected, (state) => {
            state.playTrack = false;
        });
    }
});

export const trackHistoriesReducer = trackHistoriesSlice.reducer;

export const selectPlayTrack = (state: RootState) => state.trackHistories.playTrack;
