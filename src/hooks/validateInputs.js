import { useState } from "react";

const useValidate = (applyDataF) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const enteredValueIsValid = applyDataF(enteredValue);
  const enteredValueHasError = isTouched && !enteredValueIsValid;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const valueBlurHandler = () => {
    setIsTouched(true);
  };
  const resetValueF = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    isValid: enteredValueIsValid,
    hasError: enteredValueHasError,
    changeHandler: valueChangeHandler,
    blurHandler: valueBlurHandler,
    resetValueF: resetValueF,
  };
};
export default useValidate;
