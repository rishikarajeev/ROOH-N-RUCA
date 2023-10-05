import React, { useEffect, useState } from "react";
import Header3 from "../../Components/Header/Header";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";
import CartItem from "../../Components/Cart/CartItem";
import { Link } from "react-router-dom";

function CartPage() {
  //  const cartItems= JSON.parse(localStorage.getItem("cartData2"));
  const [cartItems, setCartData] = useState([]);
  const userid = sessionStorage.getItem("userid");
  const usertoken = sessionStorage.getItem("usertoken");
  const username = sessionStorage.getItem("username");
  let totalQty = 0;
  let totalSum = 0;
  let newArr = [];
  // const ProductUrl = `${BASE_URL}/cart/products/${username}`;
  const ProductUrl = `${BASE_URL}/cart/cartdetails`;
  console.log("token", usertoken);

  console.log("URL", `bearer-token ${usertoken}`);

  useEffect(() => {
    axios
      .get(ProductUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer-token ${usertoken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCartData(response.data.data);
      });
  }, [usertoken]);

  useEffect(() => {
    console.log(cartItems);
    const {price,quantity}=cartItems;
  console.log(price)
    var total=cartItems.map((item)=>{return (item.quantity*item.price)});
    console.log(total);

  }, cartItems);

  const handleIncrement = () => {
    setCartData({ ...cartItems, quantity: cartItems.quantity + 1 });
  };

  const handleDecrement = () => {
    if (cartItems.quantity > 0) {
      setCartData({ ...cartItems, quantity: cartItems.quantity - 1 });
    }
  };
  const checkout = () => {
    console.log("addd..", cartItems);
    localStorage.setItem("cartData2", JSON.stringify(cartItems));
  };

  return (
    <>
      <Header3 />
      <div className="container">
        <h2>Shopping Cart</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item, i) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td> {/* You can add quantity logic here */}
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right">
          <strong>Total: {}</strong>
        </div>
        <Link to="/checkout">
          <button className="btn btn-primary">Checkout</button>
        </Link>
      </div>
    </>
  );
}

export default CartPage;
