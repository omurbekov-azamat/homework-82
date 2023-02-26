import React, {useState} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import {Link as NavLink} from "react-router-dom";
import {User} from '../../../types';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
            </Menu>
        </>
    );
};

export default UserMenu;