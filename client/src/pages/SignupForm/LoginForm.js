import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import '../style/lunastyle.css'; // Make sure your CSS file path is correct

const LoginForm = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false); // State for showing the modal

  function handleSubmit(event) { 
    event.preventDefault();
    axios.post('http://localhost:3000/login', {username, password})
      .then(res => {
        console.log(res);
        if (res.data) {
          navigate('/todo');
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.status === 409) { 
          setShowModal(true); 
        }
      });
  }

  const handleClick = () => {
    navigate('/signup'); 
  };

  const closeModal = () => {
    setShowModal(false); 
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
          <button type="submit" className="btn" >Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="#" onClick={handleClick}>Register</a></p>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>User already exists. Please try logging in or resetting your password.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;