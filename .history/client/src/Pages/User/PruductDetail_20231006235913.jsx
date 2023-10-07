import React, { useState, useEffect } from "react";
import axios from "axios";
import pic2 from "../../Assets/Images/pic2.jpeg";
import Header3 from "../../Components/Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants/Constants";
import "../../Assets/css/Styles.css";
import CartItem from "../../Components/Cart/CartItem";

function PruductDetail() {
  const Url = `${BASE_URL}/viewproductbyid/`;
  const [productdata, setProductata] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    _id: "",
    quantity: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const viewUrl = Url + id;

  useEffect(() => {
    axios.get(viewUrl).then((response) => {
      console.log(response.data.data);
      const newdata = response.data.data;
      //  setProductata(response.data.data);
      setProductata({
        ...productdata,
        name: newdata.name,
        category: newdata.category,
        description: newdata.description,
        _id: newdata._id,
        price: newdata.price,
        quantity: 0,
      });
    });
  }, []);

  const handleIncrement = () => {
    setProductata({ ...productdata, quantity: productdata.quantity + 1 });
  };

  const handleDecrement = () => {
    if (productdata.quantity > 0) {
      setProductata({ ...productdata, quantity: productdata.quantity - 1 });
    }
  };
  const addtoCart = () => {
    console.log("addd..", productdata);
    localStorage.setItem("cartData2", JSON.stringify(productdata));
  };
  const buyitNow = () => {
    navigate("/cart");
  };

  // const totalPrice = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );
  return (
    <div>
      <Header3 />
      <div class="container-fluid p-3">
        <div class="card ">
          <div class="row m-2">
            <div class="col-md-4">
              <img src={pic2} class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h4 class="card-title">{productdata.category}</h4>
                <h5 class="card-title">{productdata.name}</h5>
                <p class="card-text ">{productdata.description}</p>
                <h5 class="card-title fw-bold " id="currency">
                  {productdata.price}
                </h5>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
                <div class=" justify-content-md-start ">
                  <div>
                    <CartItem
                      item={productdata}
                      onIncrement={() => handleIncrement(productdata.quantity)}
                      onDecrement={handleDecrement}
                    />
                  </div>
                </div>
                <div>
                  <button
                    class="btn btn-dark fw-bold m-2"
                    type="button"
                    onClick={addtoCart}
                  >
                    Add to cart
                  </button>
                </div>
                <button
                  class="btn btn-primary fw-bold m-2"
                  type="button"
                  onClick={buyitNow}
                >
                  Buy It now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PruductDetail;
