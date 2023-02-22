import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAlbumsById} from "./albumsThunk";
import {Album} from "../../types";

interface AlbumsState {
    albums: Album[];
    fetchLoading: boolean;
}

const initialState: AlbumsState = {
    albums: [],
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
        builder.addCase(fetchAlbumsById.fulfilled, (state, {payload: albums}) => {
            state.fetchLoading = false;
            state.albums = albums;
        });
        builder.addCase(fetchAlbumsById.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;