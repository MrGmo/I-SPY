import { Link, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import LandingPage from './LandingPage';


function LoginPage(props) {

  const { handleLogin, isLoggedIn } = props;
  const navigate = useNavigate()

  if (isLoggedIn){
      return (
          <HomePage />
      )
  }


  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>UserName:</label>
        <input type="text" name="username" />
        <label>Password:</label>
        <input type="password" name="password" />
        <button type="submit" >Submit</button>
      </form>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;