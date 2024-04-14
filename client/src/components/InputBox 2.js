import React, {useState} from 'react';


const InputBox = ({ type, placeholder, iconClass }) => {

  const [value, setValue] = useState('')

  return (
  
    <div className="input-box">
      <input type={type} placeholder={placeholder} onChange={e => setValue(e.target.value)} required />
      <i className={iconClass}></i>
    </div>
  );
};

export default InputBox;