import React from "react";

import styles from "./styles.module.scss";
import Header from "../../components/Header";

const LoginSuccess = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Login successful</h2>
        <p>
          <b>Welcome ! </b>
          <span>{loggedInUser.email}</span>
        </p>
      </div>
    </>
  );
};

export default LoginSuccess;
