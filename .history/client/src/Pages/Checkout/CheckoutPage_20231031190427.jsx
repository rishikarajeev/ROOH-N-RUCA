import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Header3 from "../../Components/Header/Header"
import "../../Assets/css/Styles.css"

function CheckoutPage() {
  const [checkoutdata,setcheckoutData]=useState({});
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
          className="form-control"
          placeholder=" Enter mobile or phone number"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <h2>Delivery method</h2>
      <div className="form-check">
        <input
          className="form-check-input   "
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
        />
        <label className="form-check-label" for="flexRadioDefault1">
          Ship
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input specifyColor "
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          checked
        />
        <label className="form-check-label" for="flexRadioDefault2">
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
          aria-expanded="false"
        >
          Country/Region
        </button>
        <ul
          className="dropdown-menu dropdown-menu-dark"
          aria-labelledby="dropdownMenuButton2"
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
      />
      <input
        type="text"
        className="form-control"
        placeholder="Address"
        name="address"
      />
        <input
        type="text"
        className="form-control"
        placeholder="City"
        name="city"
      />
      <div className="input-group">
       
        <textarea className="form-control" name="address1" placeholder="apartment,suit,etc"></textarea>
      </div>
      <div className="row gap-2">
      <Button type="button"    className="btn btn-light border-black fw-bold m-2">Continue to shop</Button>
      <Button type="button"   className="btn btn-dark border-black fw-bold m-2">Place Order</Button>
      </div>
    </div>
    </div>
  );
}

export default CheckoutPage;
