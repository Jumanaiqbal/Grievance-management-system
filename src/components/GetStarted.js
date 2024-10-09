// src/components/GetStarted.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovingText from './MovingText';
import '../styles/GetStarted.css';

const GetStarted = () => {
    const navigate = useNavigate();

    return (
        <div className="get-started">
            <h1 className="main-heading">
                Welcome to <span className="abc-electronics">ABC Electronics</span>
            </h1>
            <div className="content-wrapper">
                <div className="text-container">
                    {/* Moving text displayed here */}
                    <MovingText />
                    <div className="line-dot-wrapper">
                        <div className="line"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="button-container">
                    {/* Join Us text above buttons */}
                    <p className="join-us-text">Join Us</p>
                    <div className="buttons-row"> {/* New wrapper for buttons */}
                        <button className="btn" onClick={() => navigate('/login')}>Log In</button>
                        <button className="btn" onClick={() => navigate('/register')}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
