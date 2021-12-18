import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function AppNav(props) {
  const navigate = useNavigate();
  const { user, handleLogout } = props;
  const { pathname } = useLocation();

  const onLoginPage = pathname === '/login' && user === null

  const renderButtons = () => {
    if (user === null) {
      return <button
      className="btn btn-dark login-button"
      type="submit"
      onClick={() => navigate("/login")}
    >
      Login
    </button>
    } else {
      return <button
      className="btn btn-danger logout-button"
      type="submit"
      onClick={logoutAndRedirect}
    >
      Logout
    </button>
    }
  }

  const handleHomeClick = () => {
    if (user === null) {
      console.log("no logged in user");
    } else {
      navigate("/home");
    }
  };

  const logoutAndRedirect = () => {
    handleLogout();
    alert("You've been logged out! Have a wonderful day :)");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <li
            className="navbar-brand"
            onClick={handleHomeClick}
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              listStyleType: "none",
            }}
          >
            I-SPY
          </li>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-4" style={{ fontFamily: "cursive" }}>636f6d707574657220766973696f6e</li>
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            {!onLoginPage && renderButtons()} 
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AppNav;
