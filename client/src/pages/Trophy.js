import React from "react";
import './style/lunastyle.css';
import vector from './vector.png';
import pf from './pf.png'
import { useNavigate } from 'react-router-dom';


export const Trophy = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/board');
      };

      const handleClick1 = () => {
        navigate('/profile');
      };

  return (
    <div className="trophy">
        <div className="ellipse" onClick={handleClick}/>
        <img className="vector" alt="Vector" src={vector} onClick={handleClick}/>
            <img className="iconamoon-profile" alt="Iconamoon profile" src={pf} onClick={handleClick1}/>

    </div>

  );
};