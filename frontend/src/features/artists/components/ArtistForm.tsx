import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {ArtistMutation} from "../../../types";

const ArtistForm = () => {
    const [state, setState] = useState<ArtistMutation>({
        name: '',
        image: null,
        information: '',
    });

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
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
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id='information' label='Information'
                        value={state.information}
                        onChange={inputFormHandler}
                        name='information'
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        label='Image'
                        onChange={fileInputChangeHandler}
                        name='image'
                        type='images/*'
                    />
                </Grid>
                <Grid item xs>
                    <Button type='submit' color='primary' variant='outlined'>Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ArtistForm;