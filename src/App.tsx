import React from 'react';
import './App.css';
import './Reset.css';
import {Header} from "./components/Header/Header";
import {Nav} from "./components/Nav/Nav";
import {Profile} from "./components/Profile/Profile";

function App() {
    return (
        <div className="global-wrapper">
            <Header/>
            <Nav/>
            <Profile/>
        </div>
    );
}

export default App;