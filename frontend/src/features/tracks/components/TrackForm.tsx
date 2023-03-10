import React, {useEffect, useState} from 'react';
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectAlbums} from "../../albums/albumsSlice";
import {fetchArtists} from "../../artists/artistsThunk";
import {fetchAlbumsById} from "../../albums/albumsThunk";
import {LoadingButton} from "@mui/lab";
import {selectCreateTrackLoading, selectTrackError} from "../tracksSlice";
import {selectArtists} from "../../artists/artistsSlice";
import {createTrack} from "../tracksThunk";
import {TrackMutation} from "../../../types";

const TrackForm = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const albums = useAppSelector(selectAlbums);
    const loading = useAppSelector(selectCreateTrackLoading);
    const error = useAppSelector(selectTrackError);
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

    const getAlbums = async (id: string) => {
        await dispatch(fetchAlbumsById(id)).unwrap();
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(createTrack(state));
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
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
                        error={Boolean(getFieldError('album'))}
                        helperText={getFieldError('album')}
                        required
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
                        error={Boolean(getFieldError('name'))}
                        helperText={getFieldError('name')}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id='duration' label='Duration'
                        value={state.duration}
                        onChange={inputChangeHandler}
                        name='duration'
                        error={Boolean(getFieldError('duration'))}
                        helperText={getFieldError('duration')}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id='trackNumber' label='TrackNumber'
                        value={state.trackNumber}
                        onChange={inputChangeHandler}
                        name='trackNumber'
                        type='number'
                        error={Boolean(getFieldError('trackNumber'))}
                        helperText={getFieldError('trackNumber')}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id='url' label='Youtube link'
                        value={state.url}
                        onChange={inputChangeHandler}
                        name='url'
                        error={Boolean(getFieldError('url'))}
                        helperText={getFieldError('url')}
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='secondary'
                        variant='outlined'
                        loading={loading}
                    >
                        Create
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default TrackForm;