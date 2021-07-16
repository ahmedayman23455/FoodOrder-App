import React, { Fragment, useState, useContext } from "react";
import Cart from "./Components/Cart/Cart.js";
import Header from "./Components/Layout/Header.js";
import Meals from "./Components/Meals/Meals.js";
import CartContext from "./Store/CartContext.js";

function App() {
  const ctx = useContext(CartContext);
  console.log(ctx.items);
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
