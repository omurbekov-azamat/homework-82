import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hook";
import {fetchArtists} from "../features/artists/artistsThunk";
import {selectArtists, selectArtistsFetching} from "../features/artists/artistsSlice";
import {Typography} from "@mui/material";
import ArtistsItems from "../features/artists/components/ArtistsItems";
import Spinner from "../components/UI/Spinner/Spinner";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const loading = useAppSelector(selectArtistsFetching);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <>
            <Typography variant="h2" component="h2" sx={{mb: 5, fontSize: 50}}>
                Artists
            </Typography>
            {loading && <Spinner/>}
            <ArtistsItems singers={artists}/>
        </>
    );
};

export default Artists;