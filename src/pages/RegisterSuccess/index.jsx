import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const RegisterSuccess = () => {
  return (
    <div className={styles.container}>
      <h2>Registration successful</h2>
      <p>thank you for your registration</p>
      <Link to="/welcome">click to return to home page</Link>
    </div>
  );
};

export default RegisterSuccess;
