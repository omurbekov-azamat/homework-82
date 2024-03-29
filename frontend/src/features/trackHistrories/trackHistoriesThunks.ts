import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {TrackHistoriesMutation} from "../../types";

export interface ShortInfo{
    id: string;
    url: string;
}

export const playTrack = createAsyncThunk<void, ShortInfo, { state: RootState }>(
    'trackHistories/playTrack',
    async (shortInfo, {getState}) => {
        try {
            const user = getState().users.user
            if (user) {
               await axiosApi.post('/track_histories', {track: shortInfo.id}, {headers: {'Authorization': user.token}});
            }
        } catch (e) {
            throw e
        }
    }
);

export const getHistories = createAsyncThunk<TrackHistoriesMutation[], void, { state: RootState }>(
    'trackHistories/getHistories',
    async (_, {getState}) => {
        let arr: TrackHistoriesMutation[] = [];
        const user = getState().users.user;
        if (user) {
            const response = await axiosApi.get<TrackHistoriesMutation[]>('/track_histories', {headers: {'Authorization': user.token}});
            arr = response.data;
        }
        return arr;
    }
);