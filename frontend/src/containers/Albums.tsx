import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {selectAlbums, selectAlbumsFetching} from "../features/albums/albumsSlice";
import {fetchAlbumsById} from "../features/albums/albumsThunk";
import AlbumsItems from "../features/albums/components/AlbumsItems";
import {Typography} from "@mui/material";
import Spinner from "../components/UI/Spinner/Spinner";

const Albums = () => {
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const loading = useAppSelector(selectAlbumsFetching);
    let name = '';

    useEffect(() => {
        dispatch(fetchAlbumsById(id));
    }, [dispatch]);

    for (let i = 0; i < albums.length; i++) {
        name = albums[i].artist.name;
    }

    return (
        <>
            <Typography variant="h2" component="h2" sx={{mb: 5, fontSize: 50}}>
                {name}
            </Typography>
            {loading && <Spinner/>}
            <AlbumsItems albums={albums}/>
        </>
    );
};

export default Albums;