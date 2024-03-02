import React from "react";
import { useNavigate } from "react-router-dom"; 

const ButtonWhite = ({ styles }) => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/login'); 
  };

  return (
    <button 
      type="button" 
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-black bg-third rounded-[10px] outline-none ${styles}`}
      onClick={handleClick} 
    >
      Get Started
    </button>
  );
};

export default ButtonWhite;