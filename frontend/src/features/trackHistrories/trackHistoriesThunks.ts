import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

export const playTrack = createAsyncThunk<void, string, { state: RootState }>(
    'trackHistories/playTrack',
    async (id, {getState}) => {
        try {
            const user = getState().users.user
            if (user) {
                await axiosApi.post('/track_history', {track: id}, {headers: {'Authorization': user.token}});
            }
        } catch (e) {
            console.log(e);
        }
    }
)