import React, {useState} from 'react';
import {Avatar, Button, Grid, Menu, MenuItem} from '@mui/material';
import {Link as NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectLogoutLoading} from "../../../features/user/userSlice";
import {logout} from "../../../features/user/userThunks";
import {fetchArtists} from "../../../features/artists/artistsThunk";
import {apiURL} from "../../../constants";
import {User} from '../../../types';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectLogoutLoading);

    let avatar = '';

    if (user.avatar) {
        avatar = apiURL + '/' + user.avatar;
    }

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        await navigate('/artists');
        await dispatch(fetchArtists());
    };

    return (
        <>
            <Grid container>
                <Grid item>
                    <Avatar alt={user.displayName} src={avatar}/>
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleClick}
                        color="inherit"
                    >
                        Hello, {user.displayName}
                    </Button>
                </Grid>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={NavLink} to='/track_histories'>Track history</MenuItem>
                <MenuItem component={NavLink} to='/artists/addArtist'>Add Artist</MenuItem>
                <MenuItem component={NavLink} to='/albums/addAlbum'>Add Album</MenuItem>
                <MenuItem component={NavLink} to='/tracks/addTrack'>Add Track</MenuItem>
                <MenuItem onClick={handleLogout} disabled={loading}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;