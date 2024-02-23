import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { emailRegex } from "../../utils/index";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import styles from "./styles.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Get users from local storage
  const users = JSON.parse(localStorage.getItem("users"));
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!email.trim() || !emailRegex.test(email)) {
      errors.email = "Invalid email address";
    }

    // Validate password
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // Check if user exists in local storage
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        navigate("/login-success", { replace: true });
      } else {
        setLoginError("Invalid email or password");
      }
    }
  };

  return (
    <>
      {loggedInUser && <Navigate to="/login-success" replace={true}></Navigate>}
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            label="Email"
            required={true}
            className={styles.inputs__wrapper}
            error={errors.email}
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            label="Password"
            required={true}
            className={styles.inputs__wrapper}
            error={errors.password}
          />
          {loginError && <p className={styles.error}>{loginError}</p>}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </>
  );
};

export default Login;
