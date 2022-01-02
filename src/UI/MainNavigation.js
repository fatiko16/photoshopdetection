import React from "react";
import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  return (
    <header className={classes.main}>
      <h1>Photoshop Detection</h1>
      <p>You got caught buddy, this photo ain't real</p>
    </header>
  );
}

export default MainNavigation;
