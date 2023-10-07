import React, { useState, useEffect } from "react";
import axios from "axios";
import pic2 from "../../Assets/Images/pic2.jpeg";
import Header3 from "../../Components/Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants/Constants";
import "../../Assets/css/Styles.css";
import CartItem from "../../Components/Cart/CartItem";

function PruductDetailCartApi() {
  const Url = `${BASE_URL}/viewproductbyid/`;
  const addUrl = `${BASE_URL}/cart/addproduct`;
  const username = sessionStorage.getItem("username");

  const [productdata, setProductata] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    _id: "",
    image: "",
    quantity: 0,
  });

  const { id } = useParams();
  const navigate=useNavigate();

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
        quantity: 1,
        image: newdata.image,
        subtotal: 0,
      });
    });
  }, []);

  const handleIncrement = () => {
    setProductata({ ...productdata, quantity: productdata.quantity + 1 });
    setProductata({ ...productdata, subtotal: productdata.quantity * productdata.price});
  };

  const handleDecrement = () => {
    if (productdata.quantity > 0) {
      setProductata({ ...productdata, quantity: productdata.quantity - 1 });
      setProductata({ ...productdata, subtotal: productdata.quantity * productdata.price});
    }
  };
  // const  addtoCart = async() => {
  //   // console.log("addd..", productdata);
  //   setProductata({ ...productdata, username: username });
  //   await axios.post(addUrl, productdata).then((response) => {
  //     console.log(response.data);
  //   });
  // };
  const  CartView = () => {
  
    navigate("/cartproducts");
  };


  const addtoCart = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", productdata.name);
    formData.append("category", productdata.category);
    formData.append("price", productdata.price);
    formData.append("description", productdata.description);
    formData.append("quantity", productdata.quantity);
    formData.append("", productdata.quantity);
    formData.append("image", productdata.image);

    axios.post(addUrl, formData).then((response) => {
      console.log(response);

    });
    //navigate("/cart");
  };

  return (
    <div>
      <Header3 />
      <div className="container-fluid p-3">
        <div className="card ">
          <div className="row m-2">
            <div className="col-md-4">
              <img src={`/images/${productdata.image}`} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title">{productdata.category}</h4>
                <h5 className="card-title">{productdata.name}</h5>
                <p className="card-text ">{productdata.description}</p>
                <h5 className="card-title fw-bold " id="currency">
                  {productdata.price}
                </h5>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
                <div className=" justify-content-md-start m-3 ">
                 
                      <div class="d-grid gap-2 d-md-flex justify-content-md-start ">
                        <button onClick={() => handleDecrement(productdata)}>
                          -
                        </button>
                        <span>{productdata.quantity}</span>
                        <button onClick={() => handleIncrement(productdata)}>
                          +
                        </button>
                        {/* <button onClick={() => onRemove(item)}>Remove</button> */}
                      </div>
                    </div>
                
                <form onSubmit={addtoCart} encType="multpart/form-data">
                <div>
                  <button
                    className="btn btn-primary fw-bold m-2"
                    type="submit"
                  
                  >
                    Add to cart
                  </button>
                </div>
                </form>
                <div>
                  <button
                    className="btn btn-primary fw-bold m-2"
                    type="button"
                    onClick={() => CartView()}
                  >
                   View Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PruductDetailCartApi;
