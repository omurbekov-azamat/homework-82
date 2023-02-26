import React from 'react';
import {NavLink} from "react-router-dom";
import {AppBar, Button, Container, Grid, Toolbar, Typography} from '@mui/material';
import {useAppSelector} from "../../../app/hook";
import {selectUser} from "../../../features/user/userSlice";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Container maxWidth='lg'>
                <Toolbar>
                    <Grid container justifyContent='space-between' alignContent='center'>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Button component={NavLink} to='/artists' color='inherit'>
                                Home
                            </Button>
                        </Typography>
                        <Grid item>
                            {user ? (
                                <UserMenu user={user}/>
                            ) : (
                                <AnonymousMenu/>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppToolbar;