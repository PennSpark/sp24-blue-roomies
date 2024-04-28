import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { Label } from '../Label';

function Login() {

  const [username, setUsername] = useState('');

  const handleLogin = (loginUsername) => {
    setUsername(loginUsername);
  };

  return (
    <div className="App">
      <Label />
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default Login;