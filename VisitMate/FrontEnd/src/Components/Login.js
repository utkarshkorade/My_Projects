import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../Slice/userSlice";
import loginbg from "../public/Images/loginbg.webp"; // Import the background image

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/login/validate",
        {
          username,
          password,
        }
      );

      console.log(response, "loginresponse");

      if (response.data.message === "Login successful") {
        const userRole = response?.data?.data?.userRole;
        dispatch(setUserData(response?.data?.data));
        navigate(`/${userRole}`);
      } else {
        setError(
          response.data.error ||
            "An unexpected error occurred. Please try again later."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <>
      <section
        className="vh-100 gradient-custom"
        // style={{
        //   // backgroundImage: `url(${loginbg})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "right",
        // }}
      >
        <div className="container h-80">
          <div className="row d-flex justify-content-center align-items-center h-100 pt-1">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black">
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>
                      <p className="text-center mb-4">
                        Please enter your login and password!
                      </p>
                      {error && <p className="text-danger mb-3">{error}</p>}

                      <form onSubmit={handleLogin} class="mx-1 mx-md-4">
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>

                          <div class="form-outline flex-fill mb-0">
                            <label class="form-label" for="form3Example3c">
                              Username
                            </label>
                            <input
                              type="text"
                              id="form3Example3c"
                              class="form-control form-control-lg"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <label class="form-label" for="form3Example4c">
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4c"
                              class="form-control form-control-lg"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div class="d-flex">
                          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              class="btn btn-primary btn-lg"
                            >
                              <a class="link-info login_button_register">
                                Login
                              </a>
                            </button>
                          </div>
                        </div>

                        <p class="small mb-5 pb-lg-2">
                          <a class="text-muted" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
