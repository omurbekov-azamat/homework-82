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
            const artist = artistResponse.data.name;

            return {
                tracks: tracksResponse.data,
                artist,
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

export const deleteTrack = createAsyncThunk<void, string>(
    'tracks/deleteTrack',
    async (id) => {
        try {
            await axiosApi.delete('/tracks/' + id);
        } catch (e) {
            throw e
        }
    }
);

export const publishTrack = createAsyncThunk<void, string>(
    'tracks/publishTrack',
    async (id) => {
        try {
            await axiosApi.patch('/tracks/' + id + '/togglePublished');
        } catch (e) {
            throw e;
        }
    }
);