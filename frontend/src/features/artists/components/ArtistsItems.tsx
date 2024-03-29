import React from 'react';
import {Grid} from "@mui/material";
import ArtistItem from "./ArtistItem";
import {Artist} from "../../../types";

interface Props {
    singers: Artist[]
}
const ArtistsItems: React.FC<Props> = ({singers}) => {
    return (
        <Grid item direction='row' container spacing={4}>
            {singers.map(singer => (
                <ArtistItem
                    key={singer._id}
                    singer={singer}
                />
            ))}
        </Grid>
    );
};

export default ArtistsItems;