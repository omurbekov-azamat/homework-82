import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {isAxiosError} from "axios";
import {Album, AlbumId, AlbumMutation, ValidationError} from "../../types";

export const createAlbum = createAsyncThunk<void, AlbumMutation, {rejectValue: ValidationError}>(
    'albums/createAlbum',
    async (albumData, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(albumData) as (keyof AlbumMutation)[];

            keys.forEach(key => {
                const value = albumData[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });

            await axiosApi.post('/albums', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }

            throw e;
        }
    }
);

export const fetchAlbumsById = createAsyncThunk<AlbumId, string>(
    'albums/fetchAlbumById',
    async (id) => {
        try {
            const response = await axiosApi.get<Album[]>('/albums?artist=' + id);
            const artist = response.data[0].artist.name;

            return {
                album: response.data,
                artist,
            }
        } catch (e){
            if (isAxiosError(e) && e.response && e.response.status === 404) {
                alert(e.response.data.error);
            }
            throw e;
        }
    }
);