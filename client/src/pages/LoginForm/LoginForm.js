import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../style/lunastyle.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/login', { username, password })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            navigate('/todo');
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          setErrorMessage('Invalid credentials');
        } else {
          setErrorMessage('Server error');
        }
        setShowErrorModal(true);
      });
  };

  const handleClick = () => {
    navigate('/signup');
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  return (
    <div className='bodyWrapper'>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Penn Email" onChange={e => setUsername(e.target.value)} required />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
            <i className="bx bxs-lock-alt"></i>
          </div>
        {/* <div className="remember-forgot">
          <label><input type="checkbox" />Remember Me</label>
          <a href="#">Forgot Password</a>
        </div> */}
        <button type="submit" className="btn" >Login</button>
        <div className="register-link">
          <p>Don't have an account? <a href="#"
          onClick={handleClick} >Register
          </a></p>
        
        </div>
      )}
      {showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{errorMessage}</p>
            <button onClick={closeErrorModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;