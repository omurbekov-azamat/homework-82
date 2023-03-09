import React, {useEffect, useState} from 'react';
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectAlbums} from "../../albums/albumsSlice";
import {fetchArtists} from "../../artists/artistsThunk";
import {selectArtists} from "../../artists/artistsSlice";
import {fetchAlbumsById} from "../../albums/albumsThunk";
import {LoadingButton} from "@mui/lab";
import {TrackMutation} from "../../../types";

const TrackForm = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const albums = useAppSelector(selectAlbums);
    const [state, setState] = useState<TrackMutation>({
        artist: '',
        album: '',
        name: '',
        duration: '',
        trackNumber: '',
        url: ''
    });

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const getAlbums = (id: string) => {
        dispatch(fetchAlbumsById(id));
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(state)
    };

    return (
        <form onSubmit={submitFormHandler}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography variant='h5'>Add Track</Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        select
                        label='Artist'
                        name='artist'
                        value={state.artist}
                        onChange={inputChangeHandler}
                        sx={{width: '235px'}}
                    >
                        <MenuItem value='' disabled>Please select artist</MenuItem>
                        {artists.map(artist => (
                            <MenuItem
                                key={artist._id}
                                value={artist._id}
                                onClick={() => getAlbums(artist._id)}
                            >
                                {artist.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        select
                        label='Album'
                        name='album'
                        value={state.album}
                        onChange={inputChangeHandler}
                        sx={{width: '235px'}}
                    >
                        <MenuItem value='' disabled>Please select album</MenuItem>
                        {albums.map(artist => (
                            <MenuItem
                                key={artist._id}
                                value={artist._id}
                            >
                                {artist.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        id='name' label='Name'
                        value={state.name}
                        onChange={inputChangeHandler}
                        name='name'
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id='duration' label='Duration'
                        value={state.duration}
                        onChange={inputChangeHandler}
                        name='duration'
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id='trackNumber' label='TrackNumber'
                        value={state.trackNumber}
                        onChange={inputChangeHandler}
                        name='trackNumber'
                        type='number'
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id='url' label='Youtube link'
                        value={state.url}
                        onChange={inputChangeHandler}
                        name='url'
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='secondary'
                        variant='outlined'
                    >
                        Create
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default TrackForm;