import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { emailRegex } from "../../utils/index";

import styles from "./styles.module.scss";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Get users from local storage
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Validate full name
    if (!fullName.trim()) {
      errors.fullName = "Full Name is required";
    }

    // Validate email
    if (!email.trim() || !emailRegex.test(email)) {
      errors.email = "Invalid email address";
    } else {
      // Check if email is already registered
      const isEmailRegistered = users.some((user) => user.email === email);

      if (isEmailRegistered) {
        errors.email = "This email is already registered";
      }
    }

    // Validate password
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Validate confirm password
    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const userObj = {
        id: uuidv4(),
        fullName,
        email,
        password,
      };
      users.push(userObj);
      localStorage.setItem("users", JSON.stringify(users));
      sessionStorage.setItem("isRegistered", true);
      navigate("/auth/register-success", { replace: true });
    }
  };

  return (
    <>
      {loggedInUser && <Navigate to="/login-success" replace={true}></Navigate>}
      <div className={styles.container}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="full__name"
            name="full__name"
            label="Full Name"
            required={true}
            className={styles.inputs__wrapper}
            error={errors.fullName}
          />

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

          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirm__password"
            name="confirm__password"
            label="Confirm Password"
            required={true}
            className={styles.inputs__wrapper}
            error={errors.confirmPassword}
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </>
  );
};

export default Register;
