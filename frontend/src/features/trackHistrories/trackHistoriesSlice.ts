import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {getHistories, playTrack} from "./trackHistoriesThunks";
import {TrackHistoriesMutation} from "../../types";

interface TrackHistoriesState {
    playTrack: boolean;
    fetchHistories: boolean;
    histories: TrackHistoriesMutation[];
}

const initialState: TrackHistoriesState = {
    playTrack: false,
    fetchHistories: false,
    histories: [],
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
        builder.addCase(getHistories.pending, (state) => {
            state.fetchHistories = true;
        });
        builder.addCase(getHistories.fulfilled, (state,{payload: histories}) => {
            state.fetchHistories = false;
            state.histories = histories;
        });
        builder.addCase(getHistories.rejected, (state) => {
            state.fetchHistories = false;
        });
    }
});

export const trackHistoriesReducer = trackHistoriesSlice.reducer;

export const selectPlayTrack = (state: RootState) => state.trackHistories.playTrack;
export const selectFetchHistories = (state: RootState) => state.trackHistories.fetchHistories;
export const selectHistories = (state: RootState) => state.trackHistories.histories;
