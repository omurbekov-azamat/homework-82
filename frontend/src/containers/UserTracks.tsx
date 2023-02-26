import React, {useEffect} from 'react';
import {useAppSelector} from "../app/hook";
import {selectUser} from "../features/user/userSlice";
import Tracks from "../features/tracks/Tracks";
import {useNavigate} from "react-router-dom";

const UserTracks = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    return (
        <>
            {user && (
                <Tracks/>
            )}
        </>
    );
};

export default UserTracks;