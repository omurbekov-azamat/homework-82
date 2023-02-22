import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Artist} from "../../types";

export const fetchArtists = createAsyncThunk<Artist[]>(
    'artists/fetchAll',
    async () => {
        const response = await axiosApi.get<Artist[]>('/artists');
        return response.data;
    }
);