import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CartProvider from "./Store/CartProvider";

ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById("root")
);
