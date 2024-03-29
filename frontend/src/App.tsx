import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home";
import Artists from "./containers/Artists";
import Albums from "./containers/Albums";
import Register from "./features/user/Register.";
import Login from "./features/user/Login";
import TrackHistories from "./containers/TrackHistories";
import Tracks from "./containers/Tracks";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "./app/hook";
import {selectUser} from "./features/user/userSlice";
import ArtistForm from "./features/artists/components/ArtistForm";
import AlbumForm from "./features/albums/components/AlbumForm";
import TrackForm from "./features/tracks/components/TrackForm";

function App() {
    const user = useAppSelector(selectUser);

    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Artists/>}/>
                <Route path='/artists' element={<Artists/>}/>
                <Route path='/artists/:id' element={<Albums/>}/>
                <Route path='/artists/addArtist' element={(
                    <ProtectedRoute isAllowed={user && Boolean(user)}>
                        <ArtistForm/>
                    </ProtectedRoute>
                )}/>
                <Route path='/albums/:id' element={<Tracks/>}/>
                <Route path='/albums/addAlbum' element={(
                    <ProtectedRoute isAllowed={user && Boolean(user)}>
                        <AlbumForm/>
                    </ProtectedRoute>
                )}/>
                <Route path='/tracks/addTrack' element={(
                    <ProtectedRoute isAllowed={user && Boolean(user)}>
                        <TrackForm/>
                    </ProtectedRoute>
                )}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/track_histories' element={<TrackHistories/>}/>
            </Route>
            <Route path='*' element={(<h1>Not found!</h1>)}/>
        </Routes>
    );
}

export default App;
