import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {selectAlbums, selectAlbumsFetching} from "../features/albums/albumsSlice";
import {fetchAlbumsById} from "../features/albums/albumsThunk";
import Spinner from "../components/UI/Spinner/Spinner";

const Albums = () => {
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const loading = useAppSelector(selectAlbumsFetching);

    useEffect(() => {
        dispatch(fetchAlbumsById(id));
    }, [dispatch]);

    return (
        <div>
            {loading && <Spinner/>}
            There is Album {id}
        </div>
    );
};

export default Albums;