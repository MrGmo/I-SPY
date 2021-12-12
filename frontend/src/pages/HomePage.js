// import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";


function HomePage() {

  const navigate = useNavigate()

  return (
    <div>
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand i-spy" onClick={() => navigate('/')} style={{fontWeight: "bold", fontSize: "30px"}}>I-SPY</span>
          <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active px-3" onClick={() => navigate('/object')}>Object</li>
            <li className="nav-item px-3" onClick={() => navigate('/face-recognition')}>Face Recognition</li>
            <li className="nav-item active px-3" onClick={() => navigate('/adult')}>Adult Content</li>
            <li className="nav-item px-3" onClick={() => navigate('/tag')}>Tag Check</li>
          </ul>
          </div>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              id="search"
              name="search"
              placeholder="Search"
            ></input>
            <button
              className="btn btn-dark"
              id="search-button"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#" style={{fontWeight: "bold", fontSize: "30px"}}>I-SPY</a>
        </nav>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav> */}
    </div>
  );
}


export default HomePage;