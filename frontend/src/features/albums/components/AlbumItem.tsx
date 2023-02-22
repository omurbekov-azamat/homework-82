import React from 'react';
import {useTheme} from '@mui/material/styles';
import {Link as NavLink} from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {Grid, styled} from "@mui/material";
import {apiURL} from "../../../constants";
import noImageAvailable from "../../../assets/images/noImageAvailable.jpg";
import {Album} from "../../../types";

export const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

interface Props {
    album: Album;
}

const AlbumItem: React.FC<Props> = ({album}) => {
    const theme = useTheme();

    let cardImage = noImageAvailable;

    if (album.image) {
        cardImage = apiURL + '/' + album.image;
    }

    return (
        <Grid item sx={{width: '600px'}} component={Link} to={'/albums/' + album._id}>
            <Card sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h5">
                            {album.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Release date: {album.releaseDate}
                        </Typography>
                    </CardContent>
                    <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{height: 38, width: 38}}/>
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon/> : <SkipNextIcon/>}
                        </IconButton>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{width: 200}}
                    image={cardImage}
                    alt={album.name}
                />
            </Card>
        </Grid>
    );
};

export default AlbumItem;



