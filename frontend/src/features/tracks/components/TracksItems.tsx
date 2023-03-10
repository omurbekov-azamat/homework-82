import React from 'react';
import TrackItem from "./TrackItem";
import {Grid} from "@mui/material";
import {useAppSelector} from "../../../app/hook";
import {selectUser} from "../../user/userSlice";
import {Track} from "../../../types";

interface Props {
    songs: Track[];
}

const TracksItems: React.FC<Props> = ({songs}) => {
    const user = useAppSelector(selectUser);

    let tracks = songs;

    if (user && user.role === 'user' || !user) {
        tracks = songs.filter(track => track.isPublished);
    }

    return (
            <Grid container direction='column' spacing={3}>
                {tracks.map(song => (
                    <TrackItem
                        key={song._id}
                        song={song}
                    />
                ))}
            </Grid>
    );
};

export default TracksItems;