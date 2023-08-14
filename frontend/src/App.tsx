import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Login, Registration} from "./components/Forms";
import {Users} from "./pages/Users";
import {Header} from "./components";

function App() {
    const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <div>
            <Header />
            <Routes>
                <Route path='users' element={<Users/>}/>
                <Route path='registration' element={<Registration/>}/>
                <Route path='' element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;
