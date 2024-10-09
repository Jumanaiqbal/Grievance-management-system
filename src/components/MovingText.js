// src/components/MovingText.js
import React, { useState, useEffect } from 'react';
import '../styles/MovingText.css';

const textArray = [
    "Technology at your Fingertips",
    "Resolve Your Issues Effortlessly",
    "Join Us to Experience the Future"
];

const MovingText = () => {
    const [currentText, setCurrentText] = useState(textArray[0]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
            setCurrentText(textArray[index]);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [index]);

    return <h2 className="moving-text">{currentText}</h2>;
};

export default MovingText;
