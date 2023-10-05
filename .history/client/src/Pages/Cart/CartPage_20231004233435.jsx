import React, { useEffect, useState } from "react";
import Header3 from "../../Components/Header/Header";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";
import CartItem from "../../Components/Cart/CartItem";
import { Link } from "react-router-dom";

function CartPage() {
  //  const cartItems= JSON.parse(localStorage.getItem("cartData2"));
  const [cartItems, setCartData] = useState([{}]);
  const [totalPrice, setPrice] = useState({ price: "" });
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
    var subTotal = cartItems.map((item) => {
      return item.quantity * item.price;
    });
    console.log(subTotal);
    const total = subTotal.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
    setPrice({ price: total });
    console.log(total);
  }, cartItems);

  const subTotal = (item) => {
    return item.quantity * item.price;
  };
  const checkout = () => {
    console.log("addd..", cartItems);
    localStorage.setItem("cartData2", JSON.stringify(cartItems));
  };
  const handleIncrement = () => {
    setCartData({ ...cartItems, quantity: cartItems.quantity + 1 });
  };

  const handleDecrement = () => {
    if (cartItems.quantity > 0) {
      setCartData({ ...cartItems, quantity: cartItems.quantity - 1 });
    }
  };

  return (
    <>
      <Header3 />
      <div className="container">
        <h2>Shopping Cart</h2>
        <ul>
          <li>
            {cartItems.map((item, i) => (
              <div className="card">
                <div className="card ">
                  <div className="row ">
                    <div className="col-sm-4 ">
                      <div className="row">
                        <div className="col">
                          <img
                            src={`/images/${item.image}`}
                            className="img-fluid rounded-start"
                          />
                        </div>
                        <div className="col">
                          <h4 className="card-title">{item.name}</h4>

                          <p className="card-text ">dhs. {item.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-body">
                      <div className="row">
                      <div className="col">
                        

                        <h5 className="card-title fw-bold ">
                          Dhs.{subTotal(item)}
                        </h5>

                        <div className=" justify-content-md-end ">
                          <div class="d-grid gap-2 d-md-flex justify-content-md-start ">
                            <button onClick={() => handleIncrement(cartItems)}>
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleIncrement(cartItems)}>
                              +
                            </button>
                            {/* <button onClick={() => onRemove(item)}>Remove</button> */}
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
