import React from "react";

import classes from "./Button.module.css";

const ButtonWrapper = (props) => {
  return <div className={classes.buttonwrapper}>{props.children}</div>;
};

export default ButtonWrapper;