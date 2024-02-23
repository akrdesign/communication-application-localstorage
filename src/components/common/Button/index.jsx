import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Button = (props) => {
  const { className, children, onClick, type, link } = props;

  if (link) {
    return (
      <Link to={link} className={cn(styles.button, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={cn(styles.button, className)}
      onClick={onClick}
      type={type ? type : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
