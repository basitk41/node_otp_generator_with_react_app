import React from "react";
import "./style.css";
const Button = ({ children, ...restProps }) => {
  return <button {...restProps}>{children}</button>;
};

export default Button;
