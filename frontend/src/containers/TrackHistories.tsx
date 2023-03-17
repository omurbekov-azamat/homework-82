import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hook";
import {selectUser} from "../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {getHistories} from "../features/trackHistrories/trackHistoriesThunks";
import {Typography} from "@mui/material";
import {selectFetchHistories, selectHistories} from "../features/trackHistrories/trackHistoriesSlice";
import TrackHistoriesItems from "../features/trackHistrories/components/TrackHistoriesItems";
import Spinner from "../components/UI/Spinner/Spinner";

const TrackHistories = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const histories = useAppSelector(selectHistories);
    const loading = useAppSelector(selectFetchHistories);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        dispatch(getHistories());
    }, [dispatch, user, navigate]);

    return (
        <>
            <Typography variant="h2" component="h2" sx={{mb: 5, fontSize: 50}}>
                Track Histories
            </Typography>
            {loading && <Spinner/>}
            <TrackHistoriesItems songs={histories}/>
        </>
    );
};

export default TrackHistories;