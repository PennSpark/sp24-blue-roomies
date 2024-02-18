import React from 'react';

const InputBox = ({ type, placeholder, iconClass }) => {
  return (
    <div className="input-box">
      <input type={type} placeholder={placeholder} required />
      <i className={iconClass}></i>
    </div>
  );
};

export default InputBox;