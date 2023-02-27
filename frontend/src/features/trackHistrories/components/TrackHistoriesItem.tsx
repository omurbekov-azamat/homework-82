import React from 'react';
import {Card, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import dayjs from "dayjs";
import {TrackHistoriesMutation} from "../../../types";

interface Props {
    song: TrackHistoriesMutation
}

const TrackHistoriesItem: React.FC<Props> = ({song}) => {
    return (
        <Grid item>
            <Card sx={{width: '800'}}>
                <Grid container direction='row' alignItems='center' spacing={4}>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1" color="text.dark" component="div">
                            Artist: <strong>{song.artist.name}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container alignItems='center' spacing={0.5}>
                            <Grid item>
                                <MusicNoteIcon/>
                            </Grid>
                            <Grid item>
                                <Typography component="div" variant="subtitle1">
                                    {song.track.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid item>
                            <Typography variant="subtitle1" color='text.secondary' component='div'>
                                Listen datetime: <strong>{dayjs(song.datetime).format('DD.MM.YYYY HH:mm:ss')}</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default TrackHistoriesItem;