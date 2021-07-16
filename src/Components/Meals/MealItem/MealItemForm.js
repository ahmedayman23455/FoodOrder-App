import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  // add item to cartContext items
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    // check if the amount is valid
    if (
      enteredAmount.trim().length === 0 &&
      enteredAmountNumber < 1 &&
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    // send amountNumber to the function onAddToCart that exist in MealItems
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="amount"
        input={{
          id: "amount_" + props.meal.id,
          type: "number",
          defaultValue: "1",
          min: "1",
          max: "5",
          step: "1",
        }}
      />
      {!amountIsValid && (
        <p style={{ color: "red" }}> please enter a valid amount (1-5).</p>
      )}
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
