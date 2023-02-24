import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import {ArtistWithTrack, Track} from "../../types";


export const fetchTracksFromAlbumById = createAsyncThunk<ArtistWithTrack, string>(
    'tracks/fetchTracksFromAlbum',
    async (id) => {
        try {
            const tracksResponse = await axiosApi.get<Track[]>('/tracks?album=' + id);

            const artistID = tracksResponse.data[0].album.artist;
            const album = tracksResponse.data[0].album.name;

            const artistResponse = await axiosApi.get('/artists?artist=' + artistID);

            const tracks = tracksResponse.data.sort((a, b) => {
                return a.trackNumber < b.trackNumber ? -1 : 1;
            });

            return {
                tracks,
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