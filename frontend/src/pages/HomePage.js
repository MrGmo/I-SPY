import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext.js";

const HomePage = ({ isLoggedIn, handleLogout }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <div>
      <h1>Home Page</h1>
      {user && <div>Hi {user.username}</div>}
      {!isLoggedIn ? (
        <div>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default HomePage;
