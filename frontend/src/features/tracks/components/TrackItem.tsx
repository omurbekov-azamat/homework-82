import React, {useState} from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {Card, Grid} from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {playTrack} from "../../trackHistrories/trackHistoriesThunks";
import {selectUser} from "../../user/userSlice";
import {selectPlayTrack, showYoutube} from "../../trackHistrories/trackHistoriesSlice";
import {Track} from "../../../types";

interface Props {
    song: Track;
}

const TrackItem: React.FC<Props> = ({song}) => {
    const dispatch = useAppDispatch();
    const play = useAppSelector(selectPlayTrack);
    const user = useAppSelector(selectUser);
    const [showPause, setShowPause] = useState(false);

    const startTrack = async (id: string, url: string) => {
        if (!showPause) {
            await dispatch(playTrack({id, url}));
            await dispatch(showYoutube());
        }
        setShowPause(!showPause);
    };

    const theme = useTheme();

    return (
        <Grid item>
            <Card sx={{width: '600px'}}>
                <Grid container direction='row' alignItems='center' spacing={2}>
                    <Grid item xs={1}>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            № {song.trackNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container alignItems='center' spacing={0.5}>
                            <Grid item>
                                <MusicNoteIcon/>
                            </Grid>
                            <Grid item>
                                <Typography component="div" variant="h5">
                                    {song.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container direction='column' alignItems='center'>
                            <Grid item xs>
                                {user && (
                                    <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                        <IconButton aria-label="previous" disabled>
                                            {theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
                                        </IconButton>
                                        <IconButton
                                            aria-label="play/pause"
                                            onClick={() => startTrack(song._id, song.url)}
                                            disabled={play ? play === song._id : false}
                                        >
                                            {showPause ? (
                                                <PauseIcon sx={{height: 38, width: 38}}/>
                                            ) : (
                                                <PlayArrowIcon sx={{height: 38, width: 38}}/>
                                            )}
                                        </IconButton>
                                        <IconButton aria-label="next" disabled>
                                            {theme.direction === 'rtl' ? <SkipPreviousIcon/> : <SkipNextIcon/>}
                                        </IconButton>
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Duration: {song.duration}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default TrackItem;