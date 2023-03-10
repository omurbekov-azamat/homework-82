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
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectUser} from "../../user/userSlice";
import {LoadingButton} from "@mui/lab";
import {deleteAlbum, fetchAlbumsById, publishAlbum} from "../albumsThunk";
import {selectArtistId, selectDeleteAlbumLoading, selectPublishAlbumLoading} from "../albumsSlice";
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
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const artistId = useAppSelector(selectArtistId);
    const deleteLoading = useAppSelector(selectDeleteAlbumLoading);
    const publishLoading = useAppSelector(selectPublishAlbumLoading);

    const theme = useTheme();

    let cardImage = noImageAvailable;

    if (album.image) {
        cardImage = apiURL + '/' + album.image;
    }
    const deleteAlbumHandle = async (id: string) => {
        await dispatch(deleteAlbum(id));
        if (artistId) {
            await dispatch(fetchAlbumsById(artistId));
        }
    };

    const publishAlbumHande = async (id: string) => {
        await dispatch(publishAlbum(id));
        if (artistId) {
            await dispatch(fetchAlbumsById(artistId));
        }
    };

    return (
        <Grid item sx={{width: '600px'}}>
            <Card sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}} component={Link} to={'/albums/' + album._id}>
                        <Typography component="div" variant="h5">
                            {album.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Release date: {album.releaseDate}
                        </Typography>
                    </CardContent>
                    <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                        <IconButton aria-label="previous" disabled>
                            {theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
                        </IconButton>
                        <IconButton aria-label="play/pause" disabled>
                            <PlayArrowIcon sx={{height: 38, width: 38}}/>
                        </IconButton>
                        <IconButton aria-label="next" disabled>
                            {theme.direction === 'rtl' ? <SkipPreviousIcon/> : <SkipNextIcon/>}
                        </IconButton>
                    </Box>
                    {user && user.role === 'admin' && !album.isPublished &&
                        <Typography variant='h6' sx={{color: 'red', pl: 2}}>
                            Its not published!
                        </Typography>}

                    <Grid container direction='row' justifyContent='space-around' sx={{m: 1}}>
                        <Grid item>
                            {user && user.role === 'admin' &&
                                <LoadingButton
                                    type='button'
                                    color='error'
                                    variant='contained'
                                    onClick={() => deleteAlbumHandle(album._id)}
                                    loading={deleteLoading ? deleteLoading === album._id : false}
                                    disabled={publishLoading ? publishLoading === album._id : false}
                                >
                                    delete
                                </LoadingButton>
                            }
                        </Grid>
                        <Grid item>
                            {user && !album.isPublished &&
                                <LoadingButton
                                    type='button'
                                    color='primary'
                                    variant='contained'
                                    disabled={deleteLoading ? deleteLoading === album._id : false}
                                    loading={publishLoading ? publishLoading === album._id : false}
                                    onClick={() => publishAlbumHande(album._id)}
                                >
                                    publish
                                </LoadingButton>
                            }
                        </Grid>
                    </Grid>
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



