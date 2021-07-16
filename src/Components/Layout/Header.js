import React, { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <div className={classes.header}>
        <h2>React Meals</h2>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </div>

      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
