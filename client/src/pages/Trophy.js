import React from "react";
import { useNavigate } from 'react-router-dom';
import './style/lunastyle.css';
import vector from './vector.png';

export const Trophy = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/leaderboard');
      };

  return (
    <div className="trophy">
        <div className="ellipse" onClick={handleClick}/>
        <img className="vector" alt="Vector" src={vector} onClick={handleClick}/>
        </div>

  );
};