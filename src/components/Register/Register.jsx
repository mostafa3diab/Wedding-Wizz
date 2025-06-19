import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/userContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

function Register() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  let { setLogin } = useContext(userContext);

  async function handleRegister(values) {
    console.log("Register", values);
    try {
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log("Full response", response);
      console.log("Certain Response", response.data);
      if (response.data.message === "success") {
        localStorage.setItem("userToken", response.data.token);
        setLogin(response.data.token);

        navigate("/Login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleRePassword = () => {
    setShowRePassword((prev) => !prev);
  };

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(5, "min length is 5")
      .max(24, "max length is 24"),
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[1250][0-9]{8}$/, "phone is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z](?=.*[!@#$%])[a-z0-9!@#$%]{6,24}$/,
        "Password must start with an uppercase letter and contain 6-24 lowercase letters, digits, or special characters (!@#$%)"
      ),
    rePassword: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  const isInvalid = formik.touched.rePassword && formik.errors.rePassword;

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
                        <h2 className="h4 text-center">Registration</h2>
                        <h3 className="fs-6 fw-normal text-secondary text-center m-0">
                          Enter your details to register
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={`form-control ${
                              formik.touched.name && formik.errors.name
                                ? "is-invalid"
                                : ""
                            }`}
                            name="name"
                            value={formik.values.name}
                            id="name"
                            placeholder="Last Name"
                            required
                          />
                          <label htmlFor="lastName" className="form-label">
                            Name
                          </label>
                          {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger">
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>
                      </div>

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
                            value={formik.values.email}
                            id="email"
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

                      <div className="col-12">
                        <div className="form-floating mb-3 position-relative">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={showRePassword ? "text" : "password"}
                            className={`form-control has-eye ${
                              isInvalid ? "is-invalid" : ""
                            }`}
                            name="rePassword"
                            value={formik.values.rePassword}
                            id="rePassword"
                            placeholder="Re-enter Password"
                            required
                          />
                          <label htmlFor="rePassword" className="form-label">
                            Re-enter Password
                          </label>

                          {/* 👁 Eye Icon */}
                          <span className="eye-icon" onClick={toggleRePassword}>
                            {showRePassword ? <FaEyeSlash /> : <FaEye />}
                          </span>

                          {isInvalid && (
                            <div className="text-danger mt-1 small">
                              {formik.errors.rePassword}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="tel"
                            className={`form-control ${
                              formik.touched.phone && formik.errors.phone
                                ? "is-invalid"
                                : ""
                            }`}
                            name="phone"
                            value={formik.values.phone}
                            id="Phone"
                            placeholder="Phone"
                            required
                          />
                          <label htmlFor="Phone" className="form-label">
                            Phone
                          </label>
                          {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-danger">
                              {formik.errors.phone}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="iAgree"
                            id="iAgree"
                            required
                          />
                          <label
                            className="form-check-label text-secondary"
                            htmlFor="iAgree"
                          >
                            I agree to the{" "}
                            <a
                              href="#!"
                              className="link-primary text-decoration-none"
                            >
                              terms and conditions
                            </a>
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn bsb-btn-xl btn-primary"
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <p className="m-0 text-secondary text-center">
                        Already have an account?
                        <Link
                          to={"../Login"}
                          className="link-primary text-decoration-none"
                        >
                          log in
                        </Link>
                      </p>
                    </div>
                  </div>
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
      {/* <section className="bg-light p-3 p-md-4 p-xl-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-xxl-11">
        <div className="card border-light-subtle shadow-sm">
          <div className="row g-0">
            <div className="col-12 col-md-6">
              <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy" src="./assets/img/logo-img-1.webp" alt="Welcome back you've been missed!"/>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <div className="col-12 col-lg-11 col-xl-10">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <div className="text-center mb-4">
                          <a href="#!">
                            <img src="./assets/img/bsb-logo.svg" alt="BootstrapBrain Logo" width="175" height="57"/>
                          </a>
                        </div>
                        <h2 className="h4 text-center">Registration</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex gap-3 flex-column">
                        <a href="#!" className="btn btn-lg btn-outline-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                          </svg>
                          <span className="ms-2 fs-6">Log in with Google</span>
                        </a>
                      </div>
                      <p className="text-center mt-4 mb-5">Or enter your details to register</p>
                    </div>
                  </div>
                  <form action="#!">
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First Name" required/>
                          <label for="firstName" className="form-label">First Name</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" name="lastName" id="lastName" placeholder="First Name" required/>
                          <label for="lastName" className="form-label">Last Name</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required/>
                          <label for="email" className="form-label">Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" name="password" id="password" value="" placeholder="Password" required/>
                          <label for="password" className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" name="iAgree" id="iAgree" required/>
                          <label className="form-check-label text-secondary" for="iAgree">
                            I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-dark btn-lg" type="submit">Sign up</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <p className="mb-0 mt-5 text-secondary text-center">Already have an account? <a href="#!" className="link-primary text-decoration-none">Sign in</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}
    </>
  );
}

export default Register;
