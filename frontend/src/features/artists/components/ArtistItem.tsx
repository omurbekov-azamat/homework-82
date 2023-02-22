import React from 'react';
import {Link} from 'react-router-dom';
import {apiURL} from "../../../constants";
import {Card, CardActions, CardHeader, CardMedia, Grid, IconButton, styled} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import noImageAvailable from '../../../assets/images/noImageAvailable.jpg';
import {Artist} from "../../../types";

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
        <Grid item xs={12} sm={6} lg={3}>
            <Card>
                <CardHeader title={singer.name}/>
                <ImageCardMedia image={cardImage} title={singer.name}/>
                <CardActions>
                    <IconButton component={Link} to={'/artists/' + singer._id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ArtistItem;