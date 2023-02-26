import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home";
import Artists from "./containers/Artists";
import Albums from "./containers/Albums";
import Register from "./features/user/Register.";
import Login from "./features/user/Login";
import UserTracks from "./containers/UserTracks";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Artists/>}/>
                <Route path='/artists' element={<Artists/>}/>
                <Route path='/artists/:id' element={<Albums/>}/>
                <Route path='/albums/:id' element={<UserTracks/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
            </Route>
            <Route path='*' element={(<h1>Not found!</h1>)}/>
        </Routes>
    );
}

export default App;
