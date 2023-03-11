import React from 'react';
import TrackItem from "./TrackItem";
import {Grid} from "@mui/material";
import {Track} from "../../../types";

interface Props {
    songs: Track[];
}

const TracksItems: React.FC<Props> = ({songs}) => {
    return (
            <Grid container direction='column' spacing={3}>
                {songs.map(song => (
                    <TrackItem
                        key={song._id}
                        song={song}
                    />
                ))}
            </Grid>
    );
};

export default TracksItems;