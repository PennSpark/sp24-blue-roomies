import React from 'react';
import InputBox from './InputBox'; // Importing the InputBox component
import styles from '../pages/lunastyle.css';


const LoginForm = () => {
  return (
    <div className='bodyWrapper'>
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>
        <InputBox type="text" placeholder="Username" iconClass='bx bxs-user' />
        <InputBox type="password" placeholder="Password" iconClass='bx bxs-lock-alt' />
        <div className="remember-forgot">
          <label><input type="checkbox" />Remember Me</label>
          <a href="#">Forgot Password</a>
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="register-link">
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;