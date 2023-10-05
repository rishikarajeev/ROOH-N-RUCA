import React, { useEffect, useState } from "react";
import Header3 from "../../Components/Header/Header";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";
import CartItem from "../../Components/Cart/CartItem";
import { Link } from "react-router-dom";

function CartPage() {
  //  const cartItems= JSON.parse(localStorage.getItem("cartData2"));
  const [cartItems, setCartData] = useState([{}]);
  const [totalPrice,setPrice]=useState({price:""});
  const userid = sessionStorage.getItem("userid");
  const usertoken = sessionStorage.getItem("usertoken");
  const username = sessionStorage.getItem("username");
  
  
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

    var subTotal=cartItems.map((item)=>{return (item.quantity*item.price)});
    console.log(subTotal);
    const total = subTotal.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
    setPrice({"price":total});
    console.log(total);

  }, cartItems);

  const subTotal=(item)=>{
    return  (item.quantity*item.price);

  }
  const checkout = () => {
    console.log("addd..", cartItems);
    localStorage.setItem("cartData2", JSON.stringify(cartItems));
  };

  return (
    <>
      <Header3 />
      <div className="container">
        <h2>Shopping Cart</h2>
        <ul className="table">
          <li>
            <div></div>
            {cartItems.map((item, i) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td> {/* You can add quantity logic here */}
                <td>{subTotal(item)}</td>
              </tr>
            ))}
         </li>
         </ul>
      
        <div className="text-right">
          <strong>Total: {totalPrice.price}</strong>
        </div>
        <Link to="/checkout">
          <button className="btn btn-primary">Checkout</button>
        </Link>
      </div>
    </>
  );
}

export default CartPage;
