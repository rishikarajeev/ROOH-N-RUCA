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
  incrementProduct,
  decrementProduct,
  AddCartProducts,
} from "../../Redux/Reducer/CartReducer";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.viewCart);
  const status = useSelector((state) => state.cart.status);

  const [totalPrice, setTotalPrice] = useState();
  const username = sessionStorage.getItem("username");
//fetch cart items from reducer and calculate total price
  useEffect(() => {
    dispatch(getCartProducts());
    calculateTotal();

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
  //remove each cart item calling reducer
  const RemoveCart = (item) => {
    dispatch(RemoveCartProducts(item));
    window.location.reload();
  };
    //remove all cart item calling reducer
  const RemoveAllCart = () => {
    dispatch(RemoveAllCartProducts(username));
    window.location.reload();
  };

  const calculateSubtotal = (item) => {
    return (item.quantity + 1) * item.price;
  };
  //find total of itme
  const calculateTotal = () => {
    console.log(cartItems);
    const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    console.log(total);
    setTotalPrice(total);
  };

  const checkout = () => {
    console.log("addd..", cartItems);

  };
  const handleIncrement = (itemId, item) => {
    const itemIndex = cartItems.findIndex((item) => item._id === itemId);
    var qty = item.quantity + 1;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", item.name);
    formData.append("category", item.category);
    formData.append("price", item.price);
    formData.append("description", item.description);
    formData.append("quantity", qty);
    formData.append("subtotal", calculateSubtotal(item));
    formData.append("image", item.image);
    dispatch(
      incrementProduct({
        _id: itemId,
        quantity: qty,
        subtotal: calculateSubtotal(item),
      })
    );

    dispatch(AddCartProducts(formData));
    calculateTotal();
  };

  const handleDecrement = (itemId, quantity) => {
    if (quantity > 1) {
      const itemIndex = cartItems.findIndex((item) => item._id === itemId);
      dispatch(decrementProduct({ _id: itemId, quantity: 1 }));

      calculateTotal();
      // Check if the item is found
    }
  };

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
                                handleDecrement(item._id, item.quantity)
                              }
                            >
                              -
                            </button>
                            <span className="fs-5  text-center">
                              {item.quantity}
                            </span>
                            <button
                              className=" border border-white bg-white mx-auto fs-5"
                              onClick={() => handleIncrement(item._id, item)}
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
