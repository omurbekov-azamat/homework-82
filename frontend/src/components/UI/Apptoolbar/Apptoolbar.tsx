import React from 'react';
import {NavLink} from "react-router-dom";
import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material';

const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Container maxWidth='lg'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Button component={NavLink} to='/artists' color='inherit'>
                            Home
                        </Button>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppToolbar;