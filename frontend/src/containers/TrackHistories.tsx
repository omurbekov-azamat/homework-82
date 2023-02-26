import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hook";
import {selectUser} from "../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {getHistories} from "../features/trackHistrories/trackHistoriesThunks";
import {Typography} from "@mui/material";

const TrackHistories = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        dispatch(getHistories());
    }, [user]);

    return (
        <>
            <Typography variant="h2" component="h2" sx={{mb: 5, fontSize: 50}}>
                Track Histories
            </Typography>
        </>
    );
};

export default TrackHistories;