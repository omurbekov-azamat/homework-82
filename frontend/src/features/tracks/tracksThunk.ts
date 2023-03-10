import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import {ArtistWithTrack, Track, TrackMutation, ValidationError} from "../../types";

export const createTrack = createAsyncThunk<void, TrackMutation, {rejectValue: ValidationError}>(
    'tracks/createTrack',
    async (data, {rejectWithValue}) => {
        try {
            await axiosApi.post('/tracks', data);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const fetchTracksFromAlbumById = createAsyncThunk<ArtistWithTrack, string>(
    'tracks/fetchTracksFromAlbum',
    async (id) => {
        try {
            const tracksResponse = await axiosApi.get<Track[]>('/tracks?album=' + id);

            const artistID = tracksResponse.data[0].album.artist;
            const album = tracksResponse.data[0].album.name;

            const artistResponse = await axiosApi.get('/artists?artist=' + artistID);

            return {
                tracks: tracksResponse.data,
                artist: artistResponse.data,
                album,
            };
        } catch (e) {
            alert('Error: ' + e);
            if (isAxiosError(e) && e.response && e.response.status === 404) {
                alert(e.response.data);
            }
            throw e;
        }
    }
);