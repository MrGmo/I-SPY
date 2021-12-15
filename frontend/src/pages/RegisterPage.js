import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/UserAPI";

const RegisterPage = props => {
  let navigate = useNavigate();

  const handleSignup = async evt => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    };
    let response = await signupUser(userObject);
    let data = await response.json();
    console.log(data)
    if (data.error) {
      console.log("there was an error signing up");
    } else {
      navigate("/login");
    }
  };

  return (

    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-light text-dark"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                    <p className="text-black-50 mb-5">
                      Please create a username and password.
                    </p>
                    <form onSubmit={handleSignup}>
                      <div className="form-outline form-black mb-4">
                        <input
                          type="text"
                          minLength="6"
                          maxLength ="30"
                          className="form-control form-control-lg"
                          placeholder="Username"
                          name="username"
                        />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          className="form-control validate form-control-lg"
                          id="inputValidationEx2"
                          placeholder="Password"
                          name="password"
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                          required
                        />
                      </div>
                      {/* 
                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p> */}

                      <button
                        className="btn btn-outline-dark btn-lg px-5"
                        type="submit"
                      >
                        Register
                      </button>
                    </form>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/login" style={{ textDecoration: 'none' }} className="text-black">
                        <span id="register-color">Login</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
