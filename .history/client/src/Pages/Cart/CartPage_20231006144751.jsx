import React, { useEffect, useState } from "react";
import Header3 from "../../Components/Header/Header";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";
import CartItem from "../../Components/Cart/CartItem";
import { Link } from "react-router-dom";

function CartPage() {
  //  const cartItems= JSON.parse(localStorage.getItem("cartData2"));
  const [cartItems, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
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
  const calculateSubtotal = (item) => {
    return item.quantity * item.price;
  };
  const calculateTotal = () => {
    console.log(cartItems)
    const total = cartItems.reduce((acc, item) => acc + calculateSubtotal(item), 0);
    console.log(total);
   // return total;


  

  };


  const checkout = () => {
    console.log("addd..", cartItems);
    localStorage.setItem("cartData2", JSON.stringify(cartItems));
  };
  const handleIncrement = (quantity,itemId,cartitem) => {
    const itemIndex = cartItems.findIndex(item => item._id === itemId);

    // Check if the item is found
    if (itemIndex !== -1) {
      // Create a new cart array with the updated quantity
      const updatedCart = [...cartItems];
      updatedCart[itemIndex].quantity += 1;
      updatedCart[itemIndex].subtotal = calculateSubtotal(updatedCart[itemIndex]);
      setCartData(updatedCart);
      console.log("addd..", cartItems);
      calculateTotal();
     // updatedCart[itemIndex].total=calculateTotalPrice();

      // Update the state with the new cart array
      //setCartData(updatedCart);
      console.log("addd..", updatedCart);

  
  };
}

  const handleDecrement = (quantity) => {
    if (quantity > 0) {
      setCartData([{ ...cartItems, quantity: quantity - 1 }]);
    }
  };

  return (
    <>
      <Header3 />
      <div className="container">
        <h2>Shopping Cart</h2>
    
            {cartItems.map((item, i) => (
              <div className="card p-1" key={item._id}>
                <div className="card ">
                  <div className="row ">
                    <div className="col-sm-4 d-grid gap-2 d-md-flex justify-content-md-start  ">
                      <div className="row">
                        <div className="col">
                          
                          <img
                            src={`/images/${item.image}`}
                            className="img-fluid rounded-start cover"
                            width={100} height={100}
                          />
                        </div>
                        <div className="col justify-content-md-start ">
                          <h4 className="card-title">{item.name}</h4>

                          <p className="card-text ">dhs. {item.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-body">
                      <div className="row">
                      <div className="col-1 d-grid gap-2 d-md-flex justify-content-md-start ">
                        </div>
                        <div className="col-9 text-end">
                          
                        <h5 className="card-title fw-bold ">
                          Dhs.{item.subtotal}
                        </h5>

                       
                          <div class="d-grid gap-2 d-md-flex justify-content-md-start ">
                            <button onClick={(event) => handleIncrement(item.quantity,item._id,item)}>
                              -
                            </button>
                            <span className="text-center">{item.quantity}</span>
                            <button onClick={(event) => handleIncrement(item.quantity,item._id)}>
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
       
        <div className="float-end p-2">
        <div className="">
          <strong>Total:{totalPrice} </strong>
        </div>
        <Link to="/checkout ">
          <button className="btn btn-primary">Checkout</button>
        </Link>
      </div>
      </div>
    </>
  );
}

export default CartPage;
