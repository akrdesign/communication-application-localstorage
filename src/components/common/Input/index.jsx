import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

const Input = (props) => {
  const { type, id, name, className, label, value, onChange, error, required, autoComplete } = props;

  return (
    <div className={cn(styles.container, className)}>
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          type={type ? type : "text"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Input;
