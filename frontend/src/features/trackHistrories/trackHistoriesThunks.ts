import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

export const playTrack = createAsyncThunk<void, string, { state: RootState }>(
    'trackHistories/playTrack',
    async (id, {getState}) => {
        try {
            const user = getState().users.user
            if (user) {
                await axiosApi.post('/track_histories', {track: id}, {headers: {'Authorization': user.token}});
            }
        } catch (e) {
            console.log(e);
        }
    }
)

export const getHistories = createAsyncThunk<void, void, {state: RootState}>(
    'trackHistories/getHistories',
    async (arg, {getState}) => {
        try {
            const user = getState().users.user;

            if (user) {
                const array = await axiosApi.get('/track_histories', {headers: {'Authorization': user.token}});
                const getArray = array.data;

                console.log(getArray);
            }
        } catch (e) {
            console.log(e);
        }
    }
)