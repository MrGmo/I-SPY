import { useContext } from "react";
import UserContext from "../contexts/UserContext.js";

const HomePage = ({ isLoggedIn, handleLogout }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <div>
      <h1>Home Page</h1>
      <h3>hello</h3>
      {user && <div>Hi {user.username}</div>}
    </div>
  );
};

export default HomePage;
