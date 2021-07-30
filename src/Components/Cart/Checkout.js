import React from "react";
import useValidate from "../../hooks/validateInputs";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    resetValueF: resetName,
  } = useValidate((value) => value.trim() !== "");
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: enteredStreetHasError,
    changeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    resetValueF: resetStreet,
  } = useValidate((value) => value.trim() !== "");
  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: enteredPostalCodeHasError,
    changeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeBlurHandler,
    resetValueF: resetPostalCode,
  } = useValidate(
    (value) => isNaN(parseInt(value)) !== true && value.length === 5
  );
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: enteredCityHasError,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    resetValueF: resetCity,
  } = useValidate((value) => value.trim() !== "");

  const formIsValid =
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalCodeIsValid &&
    enteredCityIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetName();
    resetStreet();
    resetPostalCode();
    resetStreet();
    resetCity();
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      PostalCode: enteredPostalCode,
      enteredCity: enteredCity,
    });
  };

  const enteredNameClasses = enteredNameHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const enteredStreetClasses = enteredStreetHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const enteredPostalCodeClasses = enteredPostalCodeHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const enteredCityClasses = enteredCityHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const confirmBtnAttributes = {
    className: `${classes.button} ${classes.confirmBtn}`,
    disabled: !formIsValid,
    "data-tooltip": "please fill all the fields",
  };

  return (
    <form
      className={classes.checkoutForm}
      onSubmit={formSubmitHandler}
      autoComplete="off"
    >
      <div className={enteredNameClasses}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          autoComplete="new-text"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          autoFocus
        />
        {enteredNameHasError && <p>the name field is empty</p>}
      </div>

      <div className={enteredStreetClasses}>
        <label htmlFor="street">Your street</label>
        <input
          type="text"
          id="street"
          autoComplete="new-text"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {enteredStreetHasError && <p>the street field is empty</p>}
      </div>
      <div className={enteredPostalCodeClasses}>
        <label htmlFor="postal">postal code</label>

        <input
          type="text"
          id="postal"
          autoComplete="new-text"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
        {enteredPostalCodeHasError && <p>please enter only 5 numbers </p>}
      </div>
      <div className={enteredCityClasses}>
        <label htmlFor="city">Your city</label>
        <input
          type="text"
          id="city"
          autoComplete="new-text"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {enteredCityHasError && <p>the city field is empty</p>}
      </div>
      <div style={{ padding: "4px 0" }}>
        <button
          type="button"
          className={`${classes.button} ${classes.cancelBtn}`}
          onClick={props.onHideCart}
        >
          Cancel
        </button>
        <button {...confirmBtnAttributes}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
