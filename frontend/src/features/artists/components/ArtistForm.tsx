import React, {useState} from 'react';
import {Grid, TextField, Typography} from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectArtistError, selectCreateArtistLoading} from "../artistsSlice";
import {LoadingButton} from "@mui/lab";
import {createArtist} from "../artistsThunk";
import {ArtistMutation} from "../../../types";
import {useNavigate} from "react-router-dom";

const ArtistForm = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectArtistError);
    const loading = useAppSelector(selectCreateArtistLoading);
    const navigate = useNavigate();
    const [state, setState] = useState<ArtistMutation>({
        name: '',
        image: null,
        information: '',
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createArtist(state)).unwrap();
        await navigate('/artists');
    };

    const inputFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prev => {
            return {...prev, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setState(prev => ({
            ...prev, [name]: files && files[0] ? files[0] : null,
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
        <form
            onSubmit={submitFormHandler}
        >
            <Grid container direction='column' spacing={2}>
                <Grid item xs>
                    <Typography variant='h5'>
                        Add artist
                    </Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        id='name' label='Name'
                        value={state.name}
                        onChange={inputFormHandler}
                        name='name'
                        error={Boolean(getFieldError('name'))}
                        helperText={getFieldError('name')}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id='information' label='Information'
                        value={state.information}
                        onChange={inputFormHandler}
                        name='information'
                        error={Boolean(getFieldError('information'))}
                        helperText={getFieldError('information')}
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        label='Image'
                        onChange={fileInputChangeHandler}
                        name='image'
                        type='images/*'
                        error={error}
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='primary'
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

export default ArtistForm;