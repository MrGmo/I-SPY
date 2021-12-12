// import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import shadow from '../img/shadow.jpeg'

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div style={{
          backgroundImage: `url(${shadow})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5"
        }}>
        <div className="register-login">
            <div align="center">
                <h4>Not a member?</h4>
                <button align="left" className="btn btn-outline-light register" type="submit">Register</button>
            </div>
        </div>
    </div>
  );
}


export default LandingPage;