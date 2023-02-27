import React from 'react';
import {TrackHistoriesMutation} from "../../../types";
import {Grid} from "@mui/material";
import TrackHistoriesItem from "./TrackHistoriesItem";

interface Props {
    songs: TrackHistoriesMutation[]
}
const TrackHistoriesItems: React.FC<Props> = ({songs}) => {
    return (
        <>
            <Grid container direction='column' spacing={1}>
                {songs.map(song => (
                    <TrackHistoriesItem
                        key={song._id}
                        song={song}
                    />
                ))}
            </Grid>
        </>
    );
};

export default TrackHistoriesItems;