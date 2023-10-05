import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";
import pic2 from "../../Assets/Images/pic2.jpeg"

function FeaturedProducts() {
    const ProductCategoryUrl=`${BASE_URL}/randomproducts`;
    const [category,setCategoryData]=useState([]);
    useEffect(()=>{
        axios.get(ProductCategoryUrl).then((response) => {
            console.log(response.data);
            setCategoryData(response.data.data);
          });

    },[]);
  return (
    <div>
      <div class="row row-cols-1 row-cols-md-2 g-4">
    
        { category.map((item)=>(
                <div class="col">
          <div class="card" >
            <img src={pic2} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
          </div>
           ))}

      </div>
    </div>
  );
}

export default FeaturedProducts;
