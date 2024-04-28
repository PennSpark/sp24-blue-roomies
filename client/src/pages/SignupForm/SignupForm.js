import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../style/lunastyle.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isNewGroup, setIsNewGroup] = useState(true);
  const [groupPassword, setGroupPassword] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/signup', { username, password, groupName, groupDescription, groupPassword })
      .then(res => {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/login');
        }, 2000);
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 409) {
            setErrorMessage('User already exists. Please try logging in or use a different email.');
          } else if (err.response.status === 401) {
            setErrorMessage('Incorrect group password. Please try again.');
          } else {
            setErrorMessage('An unexpected error occurred. Please try again later.');
          }
        } else if (err.request) {
          setErrorMessage('No response from the server. Please check your internet connection.');
        } else {
          setErrorMessage('An error occurred while sending the request.');
        }
        setShowErrorModal(true);
      });
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  const toggleGroupOption = () => {
    setIsNewGroup(!isNewGroup);
  };

  return (
    <div className='bodyWrapper'>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="input-box">
            <input type="text" placeholder="Email" onChange={e => setUsername(e.target.value)} required />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          {isNewGroup ? (
            <>
              <div className="input-box">
                <input type="text" placeholder="Group Name" onChange={e => setGroupName(e.target.value)} required />
                <i className="bx bxs-group"></i>
              </div>
              <div className="input-box">
                <input type="text" placeholder="Group Description" onChange={e => setGroupDescription(e.target.value)} />
                <i className="bx bxs-info-circle"></i>
              </div>
              <div className="input-box">
                <input type="text" placeholder="Group Code" onChange={e => setGroupPassword(e.target.value)} required />
                <i className="bx bxs-key"></i>
              </div>
              
            </>
          ) : (
            <>
              <div className="input-box">
                <input type="text" placeholder="Existing Group Name" onChange={e => setGroupName(e.target.value)} required />
                <i className="bx bxs-group"></i>
              </div>
              <div className="input-box">
                <input type="text" placeholder="Group Code" onChange={e => setGroupPassword(e.target.value)} required />
                <i className="bx bxs-key"></i>
              </div>
            </>
          )}
          <button type="button" onClick={toggleGroupOption}>
            {isNewGroup ? 'Join Existing Group' : 'Create New Group'}
          </button>
          <button type="submit" className="btn">Sign Up</button>
          <div className="login-link">
            <p>Already have an account? <a href="#" onClick={handleClickLogin}>Login</a></p>
          </div>
        </form>
      </div>
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Sign up successful! Redirecting to login...</p>
          </div>
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

export default SignupForm;