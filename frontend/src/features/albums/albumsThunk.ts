import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {isAxiosError} from "axios";
import {Album, AlbumId} from "../../types";

export const fetchAlbumsById = createAsyncThunk<AlbumId, string>(
    'albums/fetchAlbumById',
    async (id) => {
        try {
            const response = await axiosApi.get<Album[]>('/albums?artist=' + id);
            const albums = response.data.sort((a, b) => {
                return a.releaseDate < b.releaseDate ? 1 : -1;
            });
            const artist = response.data[0].artist.name;

            return {
                album: albums,
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