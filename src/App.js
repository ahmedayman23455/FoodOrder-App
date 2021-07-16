import React, { Fragment, useState } from "react";
import Cart from "./Components/Cart/Cart.js";
import Header from "./Components/Layout/Header.js";
import Meals from "./Components/Meals/Meals.js";

function App() {
  const [cartIsShown, setCartIsShow] = useState(false);
  const showCartHandler = () => {
    setCartIsShow(true);
  };
  const hideCartHandler = () => {
    setCartIsShow(false);
  };
  return (
    <Fragment>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </Fragment>
  );
}

export default App;
