import React, { useState, useEffect } from "react";
import axios from "axios";
import pic2 from "../../Assets/Images/pic2.jpeg";
import Header3 from "../../Components/Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants/Constants";
import "../../Assets/css/Styles.css";
import CartItem from "../../Components/Cart/CartItem";
import CurrencyDisplay from "../../Components/Currency";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveAllCartProducts,
  RemoveCartProducts,
  getCartProducts,
  incrementProduct,
  decrementProduct,
  AddCartProducts

} from "../../Redux/Reducer/CartReducer";


function PruductDetailCartApi() {

  const Url = `${BASE_URL}/viewproductbyid/`;

  const username = sessionStorage.getItem("username");
  const [cartitem,setCartItem]=

  const [productdata, setProductata] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    productid: "",
    image: "",
    quantity: 0,
    subtotal:0,
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  var cartItems=[];
  const viewcartItems = useSelector((state) => state.cart.viewCart);
  useEffect(() => {
    dispatch(getCartProducts());

   //  const quantity=cartItems[0].quantity ? cartItems.quantity : 1;
   //  console.log(quantity);;


  }, [dispatch]);
  console.log("",viewcartItems);
   cartItems=  viewcartItems.filter((item)=>{
    return item.productid===id;
   });
   console.log(id);
   var newitem=cartItems[0];
   console.log("",newitem);



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
        productid: id,
        price: newdata.price,
        quantity:1,
        image: newdata.image,
        subtotal:newdata.price*1,
      });
    });
  }, []);
  // useEffect(()=>{
  //   const {quantity ,price}=productdata;
  //   const total= quantity*price;
  //   setProductata({ ...productdata, subtotal: total});

  // },[productdata.quantity]);

  const handleIncrement = () => {
    const {quantity ,price}=productdata;
    setProductata({ ...productdata, quantity: quantity + 1,subtotal:(quantity+1)*price});
  

 };

  const handleDecrement = () => {
 
    const {quantity ,price}=productdata;
    if(quantity>1)
    setProductata({ ...productdata, quantity: quantity - 1});
 

    }


  const  CartView = () => {
  
    navigate("/cartproducts");
  };

  const addtoCart = (event) => {
    event.preventDefault();

      const formData = new FormData();
    formData.append("username", username);
    formData.append("productid", id);
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
                <span className="fs-5">Quantity in cart is  {cartItems.quantity}</span>
                      <div class="gap-2 d-md-flex justify-content-md-start border border-dark p-2   " style={{"max-width":"100px"}}>
                        <button className="border border-white bg-white mx-auto fs-5 "  onClick={() => handleDecrement(productdata)}>
                          -
                        </button>
                        <span className="fs-5">  {productdata.quantity}</span>
                        <button className="border border-white bg-white mx-auto fs-5"   onClick={() => handleIncrement(productdata)}>
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
