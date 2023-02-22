import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home";
import Artists from "./containers/Artists";
import Albums from "./containers/Albums";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Artists/>}/>
                <Route path='/artists' element={<Artists/>}/>
                <Route path='/artists/:id' element={<Albums/>}/>
            </Route>
            <Route path='*' element={(<h1>Not found!</h1>)}/>
        </Routes>
    );
}

export default App;
