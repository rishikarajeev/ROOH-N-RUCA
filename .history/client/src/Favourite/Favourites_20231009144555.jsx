import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import axios from "axios";
import { BASE_URL } from "../Constants/Constants";
import CartItem from "../Components/Cart/CartItem";
import { Link } from "react-router-dom";
import CurrencyDisplay from "../Components/Currency";

function Favourites() {


  const [favouriteData, setfavouriteData] = useState([{name:"",username:""}]);

  const [isFavorite, setIsFavorite] = useState({_id:"",favourite:true,username:""});
 


  const userid = sessionStorage.getItem("userid");
  const usertoken = sessionStorage.getItem("usertoken");
  const username = sessionStorage.getItem("username");


  const RemovefavouriteUrl = `${BASE_URL}/favourite/removefavouriteproduct`;
  const FavouriteADDurl = `${BASE_URL}/favourite/addfavourites`;
  const FavouritesUrl = `${BASE_URL}/favourite/favouritedetails/`;

  const toggleFavorite = (_id) => {
    
    
    const itemIndex = favouriteData.findIndex((item) => item._id === _id);
    console.log(itemIndex);
    console.log(_id);
    console.log(favouriteData);
    if(id)
    const id=itemIndex-1;

   favouriteData.splice(id,1)
   
   setfavouriteData(favouriteData);
    console.log(favouriteData);
    const updatedFavourite=favouriteData.filter((item)=> item._id == _id);
    updatedFavourite[0].username = username;


    if (itemIndex !== -1) {


        setIsFavorite({_id:_id,favourite:false,username:username});
        removeFavourite(_id);

    }    

};

const addtoFavourite = (updatedFavourite) => {
  console.log(updatedFavourite);
  axios.post(FavouriteADDurl,updatedFavourite).then((response) => {
    console.log(response);
  });

};
const removeFavourite = (_id) => {
  axios.delete(`${RemovefavouriteUrl}/${_id}`).then((response) => {

    console.log(favouriteData);
    console.log(response.data);
    //window.location.reload();

  });
};

  useEffect(() => {
    axios
      .get(FavouritesUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer-token ${usertoken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setfavouriteData(response.data.data);
        // cartItems[itemIndex].subtotal
      });
  }, [usertoken]);


  return (
    <div>
      <Header />
      <div className="container  bg-white border border-light">
        <h2>Shopping Cart</h2>
        {favouriteData!==null ?(
        favouriteData.map((item, i) => (
          
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
                    
                      <span
                      className="fs-4 ms-3 text-start" 
                      onClick={() => toggleFavorite(item._id)}
                    >
                      {isFavorite._id==item._id || isFavorite.favourite==true? (
                             <i className="fas fa-heart"></i>
                      
                    
                          ) : (
                            <i className="far fa-heart"></i>
                         
                          )}
                    </span>
                
                       
                        
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))):(<h1> WishList is Empty</h1>)}
      </div>
    </div>
  );
}

export default Favourites;
