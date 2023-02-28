import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {getHistories, playTrack} from "./trackHistoriesThunks";
import {TrackHistoriesMutation} from "../../types";

interface TrackHistoriesState {
    playTrack: false | string;
    fetchHistories: boolean;
    histories: TrackHistoriesMutation[];
    modalYoutube: boolean;
    urlYoutube: string;
}

const initialState: TrackHistoriesState = {
    playTrack: false,
    fetchHistories: false,
    histories: [],
    modalYoutube: false,
    urlYoutube: ''
}

export const trackHistoriesSlice = createSlice({
    name: 'trackHistories',
    initialState,
    reducers: {
        showYoutube: (state) => {
            state.modalYoutube = true;
        },
        closeYoutube: (state) => {
            state.modalYoutube = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(playTrack.pending, (state, {meta}) => {
            state.playTrack = meta.arg.id;
            state.urlYoutube = meta.arg.url;
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

export const {showYoutube, closeYoutube} = trackHistoriesSlice.actions;
export const selectPlayTrack = (state: RootState) => state.trackHistories.playTrack;
export const selectFetchHistories = (state: RootState) => state.trackHistories.fetchHistories;
export const selectHistories = (state: RootState) => state.trackHistories.histories;
export const selectShowModal = (state: RootState) => state.trackHistories.modalYoutube;
export const selectYoutubeUrl = (state: RootState) => state.trackHistories.urlYoutube;
