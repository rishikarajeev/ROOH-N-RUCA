import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import axios from "axios";
import { BASE_URL } from "../Constants/Constants";
import CartItem from "../Components/Cart/CartItem";
import { Link } from "react-router-dom";
import CurrencyDisplay from "../Components/Currency";

function Favourites() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [Favorites, setFavorites] = useState([]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
        setFavorites(response.data.data);
        const total = response.data.data.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        console.log(total);

        // cartItems[itemIndex].subtotal
      });
  }, [usertoken]);
  return (
    <div>
      <Header />
      <div className="container  bg-white border border-light">
        <h2>Shopping Cart</h2>

        {Favorites.map((item, i) => (
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
                          onClick={toggleFavorite}
                        >
                          {isFavorite ? (
                            <i class="fas fa-heart"></i>
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
        ))}
      </div>
    </div>
  );
}

export default Favourites;
