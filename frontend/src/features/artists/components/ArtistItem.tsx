import React from 'react';
import {Link as NavLink} from "react-router-dom";
import {Card, CardHeader, CardMedia, Grid, styled} from "@mui/material";
import noImageAvailable from '../../../assets/images/noImageAvailable.jpg';
import {apiURL} from "../../../constants";
import {Artist} from "../../../types";

export const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    singer: Artist;
}

const ArtistItem: React.FC<Props> = ({singer}) => {
    let cardImage = noImageAvailable;

    if (singer.image) {
        cardImage = apiURL + '/' + singer.image;
    }

    return (
        <Grid item sx={{width: '500px'}} component={Link} to={'/artists/' + singer._id}>
            <Card>
                <CardHeader title={singer.name}/>
                <ImageCardMedia image={cardImage} title={singer.name}/>
            </Card>
        </Grid>
    );
};

export default ArtistItem;