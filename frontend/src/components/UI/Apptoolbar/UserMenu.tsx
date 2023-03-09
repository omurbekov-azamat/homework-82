import React, {useState} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import {Link as NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectLogoutLoading} from "../../../features/user/userSlice";
import {logout} from "../../../features/user/userThunks";
import {User} from '../../../types';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectLogoutLoading);

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
    };

    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello, {user.username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={NavLink} to='/track_histories'>Track history</MenuItem>
                <MenuItem component={NavLink} to='/artists/addArtist'>Add Artist</MenuItem>
                <MenuItem component={NavLink} to='/albums/addAlbum'>Add Album</MenuItem>
                <MenuItem onClick={handleLogout} disabled={loading}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;