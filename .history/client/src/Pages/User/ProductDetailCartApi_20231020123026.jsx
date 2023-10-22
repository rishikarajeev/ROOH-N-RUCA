import React, { useState, useEffect } from "react";
import axios from "axios";
import pic2 from "../../Assets/Images/pic2.jpeg";
import Header3 from "../../Components/Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants/Constants";
import "../../Assets/css/Styles.css";
import CartItem from "../../Components/Cart/CartItem";
import CurrencyDisplay from "../../Components/Currency";
import { AddCartProducts } from "../../Redux/Reducer/CartReducer";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Reducer/ProductReducer";



function PruductDetailCartApi() {
  const dispatch = useDispatch();
  const Url = `${BASE_URL}/viewproductbyid/`;

  const username = sessionStorage.getItem("username");
  const productdata = useSelector((state) => state.products.data);
  const status = useSelector((state) => state.products.status);

  // const [productdata, setProductata] = useState({
  //   name: "",
  //   category: "",
  //   description: "",
  //   price: "",
  //   _id: "",
  //   image: "",
  //   quantity: 0,
  //   subtotal:0,
  // });

  const { id } = useParams();
  const navigate=useNavigate();

  const viewUrl = Url + id;

  useEffect(() => {
    dispatch(getProducts());
    
    // axios.get(viewUrl).then((response) => {
    //   console.log(response.data.data);
    //   const newdata = response.data.data;
    //   //  setProductata(response.data.data);
    //   setProductata({
    //     ...productdata,
    //     name: newdata.name,
    //     category: newdata.category,
    //     description: newdata.description,
    //     _id: newdata._id,
    //     price: newdata.price,
    //     quantity: 1,
    //     image: newdata.image,
    //     subtotal:newdata.subtotal,
    //   });
    // });
  }, [dispatch]);


  const handleIncrement = (itemId,item) => {
    const {quantity ,price}=productdata;
    const itemIndex = productdata.findIndex((item) => item._id === itemId);
    var qty=item.quantity+ 1
 
    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", item.name);
    formData.append("category", item.category);
    formData.append("price", item.price);
    formData.append("description", item.description);
    formData.append("quantity", qty);
    formData.append("subtotal",calculateSubtotal(item));
    formData.append("image", item.image);
    dispatch(incrementProduct({ _id: itemId, quantity:qty,subtotal:calculateSubtotal(item)}));
     

    dispatch(AddCartProducts(formData));
    //calculateTotal();
  //  setProductata({ ...productdata, quantity: quantity + 1});
  

 };
}
 const calculateSubtotal = (item) => {
  return (item.quantity+1) * item.price;
};
const calculateTotal = () => {
  console.log(cartItems);
  const total = cartItems.reduce(
    (acc, item) => acc + calculateSubtotal(item),
    0
  );

  const handleDecrement = (itemId,quantity) => {
    if (quantity > 1) {
      const itemIndex = productdata.findIndex((item) => item._id === itemId);
      dispatch(decrementProduct({ _id: itemId, quantity: 1 }));
    
      calculateTotal();
      // Check if the item is found

    }

    }


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
    formData.append("subtotal", productdata.subtotal);
    formData.append("image", productdata.image);
    dispatch(AddCartProducts(formData));
  

  };

  return (
    <div>
      <div className="container-fluid p-3">
        <div className="card ">
          <div className="row m-2">
            <div className="col-md-4">
              <img src={`/images/${productdata.image}`} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
              <h4 className="card-title fw-bolder">{productdata.name}</h4>
                <h5 className="card-title fw-bold ">{productdata.category}</h5>
             
                <p className="card-text ">{productdata.description}</p>
                <h5 className="card-title fw-bold " >
                <CurrencyDisplay amount={productdata.price} currencySymbol="AED" />
                  
                </h5>
              
                <div className=" justify-content-md-start m-3 ">
                 
                      <div class="gap-2 d-md-flex justify-content-md-start border border-dark p-2   " style={{"max-width":"100px"}}>
                        <button className="border border-white bg-white mx-auto fs-5 "  onClick={() => handleDecrement(productdata._id, productdata.quantity)}>
                          -
                        </button>
                        <span className="fs-5">{productdata.quantity}</span>
                        <button className="border border-white bg-white mx-auto fs-5"   onClick={() => handleIncrement(productdata._id, productdata)}>
                          +
                        </button>
                        {/* <button onClick={() => onRemove(item)}>Remove</button> */}
                      </div>
                    </div>
                
                <form  onSubmit={addtoCart} encType="multpart/form-data">
                <div>
                  <button
                    className="btn btn-light border-black fw-bold m-2"
                    type="submit"
                  
                  >
                    Add to cart
                  </button>
                </div>
                </form>
                <div>
                  <button
                    className="btn btn-dark border-black fw-bold m-2"
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