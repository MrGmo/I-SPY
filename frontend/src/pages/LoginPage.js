import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({isLoggedIn, handleLogout, handleLogin}) => {

  if (isLoggedIn) {
    return <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <Link to='/'>Home</Link>
      </div>
    </div>
  }

  return (
    <div>
    <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>UserName:</label>
        <input type='text' name='username' />
        <label>Password:</label>
        <input type='password' name='password' />
        <button type='submit' >Submit</button>
      </form>
      <div>
        <Link to='/'>Landing Page</Link>
      </div>
      <div>
        <Link to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default Login;