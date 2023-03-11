import React from 'react';
import {Grid} from "@mui/material";
import AlbumItem from "./AlbumItem";
import {Album} from "../../../types";

interface Props {
    albums: Album[];
}

const AlbumsItems: React.FC<Props> = ({albums}) => {
    return (
        <Grid container direction='column' spacing={4}>
            {albums.map(album => (
                <AlbumItem
                    key={album._id}
                    album={album}
                />
            ))}
        </Grid>
    );
};

export default AlbumsItems;