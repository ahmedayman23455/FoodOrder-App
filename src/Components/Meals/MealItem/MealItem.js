import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/CartContext";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  // add item to the items when click add
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amount,
      price: props.meal.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>${props.meal.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm meal={props.meal} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
