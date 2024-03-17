import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"; 
import styles from '../style/lunastyle.css';
import axios from 'axios';

const LoginForm = () => {

  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) { 
    event.preventDefault()
    axios.post('http://localhost:3306/login', {username, password})
    .then(res => {
      console.log(res)
      if (res.data) {
        navigate('/main')
      }})
    .catch(err => console.log(err));
  }

  const handleClick = () => {
    navigate('/signup'); 
  };

  const handleClick1 = () => {
    navigate('/login'); 
  };


  return (
    <div className='bodyWrapper'>
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="input-box">
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} required />
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
        <button type="submit" className="btn" onClick={handleClick1}>
        Login</button>
        <div className="register-link">
          <p>Don't have an account? <a href="#"
          onClick={handleClick} >Register
          </a></p>
        
        </div>
        
      </form>
    </div>
    </div>
  );
};

export default LoginForm;