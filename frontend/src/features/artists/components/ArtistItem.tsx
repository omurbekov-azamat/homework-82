import React from 'react';
import {Link as NavLink} from "react-router-dom";
import {Card, CardHeader, CardMedia, Grid, styled} from "@mui/material";
import noImageAvailable from '../../../assets/images/noImageAvailable.jpg';
import {apiURL} from "../../../constants";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectUser} from "../../user/userSlice";
import {LoadingButton} from "@mui/lab";
import {deleteSinger, publishSinger} from "../artistsThunk";
import {selectDeleteArtistLoading, selectPublishArtistLoading} from "../artistsSlice";
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
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const deleteLoading = useAppSelector(selectDeleteArtistLoading);
    const publishLoading = useAppSelector(selectPublishArtistLoading);

    let cardImage = noImageAvailable;

    if (singer.image) {
        cardImage = apiURL + '/' + singer.image;
    }

    const deleteArtist = (id: string) => {
        dispatch(deleteSinger(id));
    };

    const publishArtist = (id: string) => {
        dispatch(publishSinger(id));
    };

    return (
        <Grid item sx={{width: '500px'}}>
            <Card component={Link} to={'/artists/' + singer._id}>
                <Grid container direction='row'>
                    <Grid item xs>
                        <CardHeader title={singer.name}/>
                    </Grid>
                    <Grid item>
                        {user && user.role === 'admin' && singer.isPublished === false &&
                            <CardHeader sx={{color: 'red'}} title='Its not published'/>}
                    </Grid>
                </Grid>
                <ImageCardMedia image={cardImage} title={singer.name}/>
            </Card>
            {user && user.role === 'admin' && singer.isPublished === false &&
                <Grid container direction='row' justifyContent='space-around' sx={{m: 1}}>
                    <Grid item>
                        <LoadingButton
                            type='button'
                            color='error'
                            variant='contained'
                            onClick={() => deleteArtist(singer._id)}
                            loading={deleteLoading}
                            disabled={publishLoading}
                        >
                            delete
                        </LoadingButton>
                    </Grid>
                    <Grid item>
                        <LoadingButton
                            type='button'
                            color='primary'
                            variant='contained'
                            disabled={deleteLoading}
                            loading={publishLoading}
                            onClick={() => publishArtist(singer._id)}
                        >
                            publish
                        </LoadingButton>
                    </Grid>
                </Grid>
            }
        </Grid>
    );
};

export default ArtistItem;