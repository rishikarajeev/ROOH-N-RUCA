import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Header3 from "../../Components/Header/Header"
import "../../Assets/css/Styles.css"
import { Link } from "react-router-dom";

function CheckoutPage() {
  co
  const [checkoutdata,setcheckoutData]=useState({phone: '', name: '', address: '', city: '', delivery: 'ship',paymentype:'cashondelivery'});

  const enterDetails = (e) => {
    const { name, value } = e.target;
    setcheckoutData({ ...checkoutdata, [name]: value });

  };
  const Checkout=()=>{
    console.log(checkoutdata);

  }

  return (
    <div>
    <div className="container p-5">
      <h2>Contact</h2>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          +91
        </span>
        <input
          type="phone"
          name="phone"
          onChange={enterDetails}
          className="form-control"
          placeholder=" Enter mobile or phone number"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <h2>Delivery method</h2>
      <div className="form-check">
        <input
          className="form-check-input  acc "
          type="radio"
          name="delivery"
          value="ship"
          id="shipRadio"
          onChange={enterDetails}
          checked
        />
        <label className="form-check-label" for="shipRadio">
          Ship
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input specifyColor "
          type="radio"
          name="delivery"
          value="pickup"
          id="pickupRadio"
          onChange={enterDetails}
      
        />
        <label className="form-check-label" for="pickupRadio">
          Pick Up
        </label>
      </div>
      <h2>Shipping Address</h2>
      <div className="dropdown">
        <button
         
          className="btn btn-dark border-black fw-bold m-2 dropdown-toggle"
          type="button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          onChange={enterDetails}
          aria-expanded="false"
        >
          Country/Region
        </button>
        <ul
          className="dropdown-menu dropdown-menu-dark"
          aria-labelledby="dropdownMenuButton2"
          onChange={enterDetails}
        >
          <li>
            <a className="dropdown-item active" href="#">
              Uae
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Qatar
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              India
            </a>
          </li>
        </ul>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Full Name"
        name="name"
        onChange={enterDetails}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Address"
        name="address"
        onChange={enterDetails}
      />
        <input
        type="text"
        className="form-control"
        placeholder="City"
        name="city"
        onChange={enterDetails}
      />
      <div className="input-group">
       
        <textarea className="form-control" name="address1" placeholder="apartment,suit,etc"></textarea>
      </div>
      <h2>Payment Method</h2>
      <div className="form-check m-3">
        <input
          className="form-check-input   "
          type="radio"
          name="paymenttype"
          value="cashondelivery"
          id="cashondeliveryRadio"
          onChange={enterDetails}
          checked
        />
        <label className="form-check-label" for="cashondeliveryRadio">
          Cash On delivery
        </label>
      </div>
      <div className="row gap-2">
      <Link to={"/viewproducts"}>
      <Button type="button"    className="btn btn-light border-black fw-bold m-2 w-100">Continue to shop</Button>
      </Link>

      <Button type="button"  onClick={()=>Checkout()} className="btn btn-dark border-black fw-bold m-2 w-100">Place Order</Button>

      </div>
    </div>
    </div>
  );
}

export default CheckoutPage;
