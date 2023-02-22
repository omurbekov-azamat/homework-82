import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {fetchTracksFromAlbumById} from "../features/tracks/tracksThunk";
import {selectAlbum, selectArtist, selectTracks, selectTracksFetching} from "../features/tracks/tracksSlice";
import TracksItems from "../features/tracks/components/TracksItems";
import {Typography} from "@mui/material";
import Spinner from "../components/UI/Spinner/Spinner";

const Tracks = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks)
    const artist = useAppSelector(selectArtist);
    const album = useAppSelector(selectAlbum);
    const loading = useAppSelector(selectTracksFetching);
    const {id} = useParams() as {id: string};

    useEffect(() => {
        dispatch(fetchTracksFromAlbumById(id))
    }, [dispatch]);

    return (
        <>
            {loading && <Spinner/>}
            <Typography variant="h2" component="h2" sx={{mb: 5, fontSize: 50}}>
                {artist && artist.name}
            </Typography>
            <Typography variant="h2" component="h2" sx={{mb: 3, fontSize: 30, color: 'red'}}>
                {album && album + ' (album)'}
            </Typography>
            <TracksItems songs={tracks}/>
        </>
    );
};

export default Tracks;