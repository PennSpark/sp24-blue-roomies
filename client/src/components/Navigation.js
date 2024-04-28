import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <button onClick={() => handleClick('/todo')}>Todo</button>
      <button onClick={() => handleClick('/board')}>Board</button>
    </div>
  );
};

export default Navigation;