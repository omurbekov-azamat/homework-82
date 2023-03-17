import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {selectAlbums, selectAlbumsFetching, selectArtistForAlbum} from "../features/albums/albumsSlice";
import {fetchAlbumsById} from "../features/albums/albumsThunk";
import AlbumsItems from "../features/albums/components/AlbumsItems";
import {Typography} from "@mui/material";
import Spinner from "../components/UI/Spinner/Spinner";

const Albums = () => {
    const {id} = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const artist = useAppSelector(selectArtistForAlbum)
    const loading = useAppSelector(selectAlbumsFetching);

    useEffect(() => {
        dispatch(fetchAlbumsById(id));
    }, [dispatch, id]);

    return (
        <>
            <Typography variant="h2" component="h2" sx={{mb: 5, fontSize: 50}}>
                {artist}
            </Typography>
            {loading && <Spinner/>}
            <AlbumsItems albums={albums}/>
        </>
    );
};

export default Albums;