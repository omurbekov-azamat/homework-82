import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {isAxiosError} from "axios";
import {Artist, ArtistMutation, ValidationError} from "../../types";

export const createArtist = createAsyncThunk<void, ArtistMutation, { rejectValue: ValidationError }>(
    'artists/createArtist',
    async (artistData, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(artistData) as (keyof ArtistMutation)[];

            keys.forEach(key => {
                const value = artistData[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });

            await axiosApi.post('/artists', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }

            throw e;
        }
    }
);

export const fetchArtists = createAsyncThunk<Artist[]>(
    'artists/fetchAll',
    async () => {
        const response = await axiosApi.get<Artist[]>('/artists');
        return response.data;
    }
);

export const deleteSinger = createAsyncThunk<void, string>(
    'artists/deleteArtist',
    async (id, {dispatch}) => {
        try {
            await axiosApi.delete('/artists/' + id);
            await dispatch(fetchArtists());
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 403) {
                return alert(e.response.data.message);
            }
            throw e;
        }
    }
);

export const publishSinger = createAsyncThunk<void, string>(
    'artists/publishArtist',
    async (id, {dispatch}) => {
        try {
            await axiosApi.patch('/artists/' + id + '/togglePublished');
            await dispatch(fetchArtists());
        } catch (e) {
            throw e;
        }
    }
);