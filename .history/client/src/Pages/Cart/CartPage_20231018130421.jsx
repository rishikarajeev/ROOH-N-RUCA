import React, { useEffect, useState } from "react";
import Header3 from "../../Components/Header/Header";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";
import CartItem from "../../Components/Cart/CartItem";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import CurrencyDisplay from "../../Components/Currency";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveAllCartProducts,
  RemoveCartProducts,
  getCartProducts,
} from "../../Redux/Reducer/CartReducer";

function CartPage() {
  //  const cartItems= JSON.parse(localStorage.getItem("cartData2"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.viewCart);
  const status = useSelector((state) => state.cart.status);

  const [totalPrice, setTotalPrice] = useState();
  const userid = sessionStorage.getItem("userid");
  const usertoken = sessionStorage.getItem("usertoken");
  const username = sessionStorage.getItem("username");

  const ProductUrl = `${BASE_URL}/cart/cartdetails`;
  console.log("token", usertoken);
  console.log("URL", `bearer-token ${usertoken}`);
  useEffect(() => {
    dispatch(getCartProducts());
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    console.log(total);
    setTotalPrice(total);
  }, [dispatch]);

  if (status === "loading") {
    return <h1 className="text-center">loading..</h1>;
  }
  if (status === "error") {
    return (
      <Alert className="text-center" key="danger" variant="danger">
        error while loading..try again later
      </Alert>
    );
  }
  const RemoveCart = (item) => {
    dispatch(RemoveCartProducts(item));
    window.location.reload();
  };
  const RemoveAllCart = () => {
    dispatch(RemoveAllCartProducts(username));
    window.location.reload();
  };

  const calculateSubtotal = (item) => {
    return item.quantity * item.price;
  };
  const calculateTotal = () => {
    console.log(cartItems);
    const total = cartItems.reduce(
      (acc, item) => acc + calculateSubtotal(item),
      0
    );
    console.log(total);
    setTotalPrice(total);
    // return total;
  };

  const checkout = () => {
    console.log("addd..", cartItems);
    localStorage.setItem("cartData2", JSON.stringify(cartItems));
  };
  const handleIncrement = (productdata) => {
    const {quantity ,price}=productdata;
    setProductata({ ...productdata, quantity: quantity + 1,subtotal :calculateSubtotal(updatedCart[itemIndex]),total:calculateTotalPrice()});
    calculateTotal();

 };

  const handleDecrement = (productdata) => {
 
    const {quantity ,price}=productdata;
    const itemIndex = cartItems.findIndex((item) => item._id === itemId);
    if (itemIndex !== -1) {
    if(quantity>1)
    setProductata({ ...productdata, quantity: quantity - 1,subtotal :calculateSubtotal(carti),total:calculateTotalPrice()});
    calculateTotal();
    }

    }
  // const handleIncrement = (itemId) => {
  //   const itemIndex = cartItems.findIndex((item) => item._id === itemId);
  //   console.log(itemId);
  //   console.log(itemIndex);

  //   // Check if the item is found
  //   if (itemIndex !== -1) {
  //     // Create a new cart array with the updated quantity
  //     const updatedCart = [...cartItems];
  //     console.log(updatedCart);
  //     updatedCart[itemIndex].quantity += 1;
  //     updatedCart[itemIndex].subtotal = calculateSubtotal(
  //       updatedCart[itemIndex]
  //     );
  //     // setCartData(updatedCart);
  //     console.log("addd..", cartItems);
  //     calculateTotal();
  //     console.log("addd..", updatedCart);
  //   }
  // };

  // const handleDecrement = (itemId, quantity) => {
  //   if (quantity > 1) {
  //     const itemIndex = cartItems.findIndex((item) => item._id === itemId);

  //     // Check if the item is found
  //     if (itemIndex !== -1) {
  //       // Create a new cart array with the updated quantity
  //       const updatedCart = [...cartItems];
  //       updatedCart[itemIndex].quantity -= 1;
  //       updatedCart[itemIndex].subtotal = calculateSubtotal(
  //         updatedCart[itemIndex]
  //       );
  //       //  setCartData(updatedCart);
  //       console.log("addd..", cartItems);
  //       calculateTotal();
  //       console.log("addd..", updatedCart);
  //     }
  //   }
  // };

  return (
    <>
      <div className="container  bg-white border border-light">
        <div className=" row row-cols-auto">
        <h2 className="cols">Shopping Cart</h2>
        <button
          className="cols btn btn-dark m-2  float-end"
          onClick={() => RemoveAllCart()}
        >
          {" "}
          <span className="text-right  ">
            Delete All
            <i className="fas fa-trash"></i>
          </span>{" "}
        </button>
        </div>

        {cartItems.map((item, i) => (
          <div className="card p-1 border border-white mx-auto" key={item._id}>
            <div className="card ">
              <div className="row ">
                <div className="col-sm-4 d-grid gap-2 d-md-flex justify-content-md-start  ">
                  <div className="row">
                    <div className="col">
                      <img
                        src={`/images/${item.image}`}
                        className="img-fluid rounded-start cover"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="col justify-content-md-start p-2 ">
                      <h4 className="card-title fs-6">{item.name}</h4>

                      <p className="card-text ">
                        <CurrencyDisplay
                          amount={item.price}
                          currencySymbol="AED"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9 text-end ">
                        <div className="row row-cols-3">
                          <div class=" d-md-flex text-center border border-dark p-2  row row-cols-3 ">
                            <button
                              className="col border border-white bg-white mx-auto fs-5 "
                              onClick={() =>
                                handleDecrement(item)
                              }
                            >
                              -
                            </button>
                            <span className="fs-5  text-center">
                              {item.quantity}
                            </span>
                            <button
                              className=" border border-white bg-white mx-auto fs-5"
                              onClick={() => handleIncrement(item)}
                            >
                              +
                            </button>
                          </div>
                          <div onClick={() => RemoveCart(item._id)}>
                            <span className="fs-5 ms-3 text-start">
                              <i className="fas fa-trash"></i>
                            </span>
                          </div>
                          <div>
                            <h5 className="card-title fs-6 ">
                              <CurrencyDisplay
                                amount={item.subtotal}
                                currencySymbol="AED"
                              />
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="float-end m-2">
          <div className="">
            <strong>
              Estimated Total:
              <CurrencyDisplay amount={totalPrice} currencySymbol="AED" />
            </strong>
          </div>
          <Link to="/checkout ">
            <button className="btn btn-dark m-2">Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartPage;
