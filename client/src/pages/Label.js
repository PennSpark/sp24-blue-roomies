import React from "react";
import { useNavigate } from 'react-router-dom';

export const Label = () => {
  const navigate = useNavigate();
  const handleClick = () => {
      navigate('/Todo');
    };

  return (
    <div className="w-[153px] h-[51px]" onClick={handleClick}>
      <p className="fixed top-3 left-5 [font-family:'Space_Grotesk-Bold',Helvetica] font-bold text-transparent text-[40px] tracking-[0] leading-[normal]" onClick={handleClick}>
        <span className="text-[#00b8b6]" onClick={handleClick}>room</span>
        <span className="text-[#ffb95c]" onClick={handleClick}>i</span>
        <span className="text-[#ff8c83]" onClick={handleClick}>es</span>
      </p>
    </div>
  );
};