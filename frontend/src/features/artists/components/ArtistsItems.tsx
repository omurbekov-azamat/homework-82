import React from 'react';
import {Grid} from "@mui/material";
import ArtistItem from "./ArtistItem";
import {useAppSelector} from "../../../app/hook";
import {selectUser} from "../../user/userSlice";
import {Artist} from "../../../types";

interface Props {
    singers: Artist[]
}
const ArtistsItems: React.FC<Props> = ({singers}) => {
    const user = useAppSelector(selectUser);

    let artists = singers;

    if (user && user.role === 'user' || !user) {
        artists = singers.filter(artist => artist.isPublished === true);
    }

    return (
        <Grid item direction='row' container spacing={2}>
            {artists.map(singer => (
                <ArtistItem
                    key={singer._id}
                    singer={singer}
                />
            ))}
        </Grid>
    );
};

export default ArtistsItems;