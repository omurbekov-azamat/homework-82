import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAlbumsById} from "./albumsThunk";
import {Album} from "../../types";

interface AlbumsState {
    albums: Album[];
    artist: string | null
    fetchLoading: boolean;
}

const initialState: AlbumsState = {
    albums: [],
    artist: null,
    fetchLoading: false,
};

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbumsById.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchAlbumsById.fulfilled, (state, {payload: data}) => {
            state.fetchLoading = false;
            state.albums = data.album;
            state.artist = data.artist;
        });
        builder.addCase(fetchAlbumsById.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectArtistForAlbum = (state: RootState) => state.albums.artist;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;