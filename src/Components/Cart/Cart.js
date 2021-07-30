import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSumbitError] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const submitOrderHandler = async (userData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://react-http-9f84f-default-rtdb.firebaseio.com/orders.json",
        {
          body: JSON.stringify({ user: userData, orderItems: cartCtx.items }),
          headers: { "Content-Type": "Application.json" },
          method: "POST",
        }
      );
      if (!response.ok) {
        setIsSubmitting(false);
        throw new Error("failed to post data");
      }
      console.log("test");
      setDidSubmit(true);
      cartCtx.clearItems();
    } catch (err) {
      setSumbitError(err.message || "something went wrong");
    }
  };
  /* important note: bind allow us to preconfiqure functions in places where we need to pass in value but we
  also don't want to directly execute a function */
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          item={item}
          key={item.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderClickHandler = () => {
    setShowCheckout(true);
  };

  let ModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$ {cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {showCheckout && (
        <Checkout
          onHideCart={props.onHideCart}
          onConfirm={submitOrderHandler}
        />
      )}

      {!showCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderClickHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
  if (submitError) {
    console.log(isSubmitting);
    ModalContent = <p>{submitError}</p>;
  }

  if (isSubmitting) {
    ModalContent = <p>Sedning order data...</p>;
  }

  if (didSubmit) {
    ModalContent = (
      <React.Fragment>
        <p>Successfuly sent the order</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onHideCart}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
  }
  return <Modal onHideCart={props.onHideCart}>{ModalContent}</Modal>;
};
export default Cart;
