import React from 'react';
import {Grid} from "@mui/material";
import AlbumItem from "./AlbumItem";
import {useAppSelector} from "../../../app/hook";
import {selectUser} from "../../user/userSlice";
import {Album} from "../../../types";

interface Props {
    albums: Album[];
}

const AlbumsItems: React.FC<Props> = ({albums}) => {
    const user = useAppSelector(selectUser);

    let showAlbums = albums;

    if (user && user.role === 'user' || !user) {
        showAlbums = albums.filter(album => album.isPublished);
    }

    return (
        <Grid container direction='column' spacing={2}>
            {showAlbums.map(album => (
                <AlbumItem
                    key={album._id}
                    album={album}
                />
            ))}
        </Grid>
    );
};

export default AlbumsItems;