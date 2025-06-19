import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/userContext";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function Login() {
  let navigate = useNavigate();
  let { setLogin } = useContext(userContext);
  const { setUserName } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  async function handleLogin(formsData) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        formsData
      );

      console.log("success", response);

      if (response.data.message === "success") {
        const token = response.data.token;
        const userName = response.data.user.name;

        // ✅ Save token and userName in localStorage
        localStorage.setItem("userToken", token);
        localStorage.setItem("userName", userName);

        // ✅ Update context states
        setLogin(true);
        setUserName(userName);

        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z](?=.*[!@#$%])[a-z0-9!@#$%]{6,24}$/,
        "Password must start with an uppercase letter and contain 6-24 lowercase letters, digits, or special characters (!@#$%)"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card border border-light-subtle rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h2 className="h4 text-center">Login</h2>
                        <h3 className="fs-6 fw-normal text-secondary text-center m-0">
                          Enter your details to Login
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={formik.handleSubmit} action="#!">
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="email"
                            className={`form-control ${
                              formik.touched.email && formik.errors.email
                                ? "is-invalid"
                                : ""
                            }`}
                            name="email"
                            id="email"
                            value={formik.values.email}
                            placeholder="name@example.com"
                            required
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3 position-relative">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${
                              formik.touched.password && formik.errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            name="password"
                            value={formik.values.password}
                            id="password"
                            placeholder="Password"
                            required
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>

                          {/* 👁 Eye Icon */}
                          <span
                            onClick={togglePassword}
                            style={{
                              position: "absolute",
                              top: "30px",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              zIndex: 10,
                            }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>

                          {formik.touched.password &&
                            formik.errors.password && (
                              <div className="text-danger">
                                {formik.errors.password}
                              </div>
                            )}
                        </div>
                      </div>
                      <div>
                        <Link
                          to={"../Forget-Password"}
                          className="link-primary text-decoration-none"
                        >
                          forgot password
                        </Link>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn bsb-btn-xl btn-primary"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <hr className="mt-5 mb-4 border-secondary-subtle" />
                          <p className="m-0 text-secondary text-center">
                            New Here?{" "}
                            <Link
                              to={"../Register"}
                              className="link-primary text-decoration-none"
                            >
                              Register
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <p className="mt-5 mb-5">Or continue with</p>
                      <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                        <a
                          href="https://www.google.com/"
                          className="btn btn-lg btn-outline-danger p-3 lh-1"
                          target="blank"
                        >
                          <i className="fa-brands fa-google"></i>
                        </a>
                        <a
                          href="https://www.facebook.com/"
                          className="btn btn-lg btn-outline-primary p-3 lh-1"
                          target="blank"
                        >
                          <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a
                          href="https://www.twitter.com/"
                          className="btn btn-lg btn-outline-dark p-3 lh-1"
                          target="blank"
                        >
                          <i className="fa-brands fa-x-twitter"></i>
                        </a>
                      </div>
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
