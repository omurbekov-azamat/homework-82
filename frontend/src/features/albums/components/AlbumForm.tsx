import React, {useEffect, useState} from 'react';
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectArtists} from "../../artists/artistsSlice";
import {fetchArtists} from "../../artists/artistsThunk";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import {AlbumMutation} from "../../../types";
import {selectAlbumError, selectCreateAlbumLoading} from "../albumsSlice";
import {createAlbum} from "../albumsThunk";

const AlbumForm = () => {
    const dispatch = useAppDispatch()
    const artists = useAppSelector(selectArtists);
    const loading = useAppSelector(selectCreateAlbumLoading);
    const error = useAppSelector(selectAlbumError);
    const [state, setState] = useState<AlbumMutation>({
        artist: '',
        name: '',
        releaseDate: '',
        image: null,
    });

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(createAlbum(state));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setState(prevState => ({
            ...prevState, [name]: files && files[0] ? files[0] : null,
        }));
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
                <Grid item xs>
                    <Typography variant='h5'>
                        Add Album
                    </Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        select
                        label='Artist'
                        name='artist'
                        value={state.artist}
                        onChange={inputChangeHandler}
                        sx={{width: '235px'}}
                        error={Boolean(getFieldError('artist'))}
                        helperText={getFieldError('artist')}
                        required
                    >
                        <MenuItem value='' disabled>Please select artist</MenuItem>
                        {artists.map(artist => (
                            <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
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
                        id='releaseDate' label='Release Date'
                        value={state.releaseDate}
                        onChange={inputChangeHandler}
                        name='releaseDate'
                        type='number'
                        error={Boolean(getFieldError('releaseDate'))}
                        helperText={getFieldError('releaseDate')}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        label="Image"
                        onChange={fileInputChangeHandler}
                        name="image"
                        type='image/*'
                        error={error}
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='warning'
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

export default AlbumForm;