import './App.css';
import React from 'react';
import image from './unnamed.jpg'; 


function navbar() {
    return (
        <header className="header">
            <img className='icon' src={image} alt='icon'></img>
            <a className="logo" href="/">BabyOver</a>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
                <li><a href="/" className="link link-theme link-arrow">Quiz</a></li>
                <li><a href="/" className="link link-theme link-arrow">About Us</a></li>
               
            </ul>
        </header>
    )
}

export default navbar;