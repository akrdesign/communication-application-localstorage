import React from "react";
import Button from "../../components/common/Button";

import styles from "./styles.module.scss";

const Welcome = () => {
  // Remove login user from local storage
  localStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("isRegistered");
  return (
    <div className={styles.container}>
      <h2>Welcome to users module</h2>
      <div className={styles.wrappers}>
        <h3>Existing users</h3>
        <Button link="/auth/login">Login</Button>
      </div>
      <div className={styles.wrappers}>
        <h3>New users</h3>
        <Button link="/auth/register">Resigner</Button>
      </div>
    </div>
  );
};

export default Welcome;
