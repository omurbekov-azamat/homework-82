import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Album} from "../../types";

export const fetchAlbumsById = createAsyncThunk<Album[], string>(
    'albums/fetchAlbumById',
    async (id) => {
        const response = await axiosApi.get<Album[]>('/albums?artist=' + id);
        return response.data.sort((a, b) => {
            return a.releaseDate < b.releaseDate ? 1 : -1;
        });
    }
);