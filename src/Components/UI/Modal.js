import React, { Fragment } from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onHideCart}>
      {" "}
    </div>
  );
};
const ModalOverlay = (props) => {
  return <div className={classes.modal}> {props.children}</div>;
};
const Modal = (props) => {
  const portalElement = document.getElementById("overlayModal");
  return (
    <Fragment>
      {reactDom.createPortal(
        <BackDrop onHideCart={props.onHideCart} />,
        portalElement
      )}

      {reactDom.createPortal(
        <ModalOverlay> {props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
