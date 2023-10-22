import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";
import pic2 from "../../Assets/Images/banner2.jpg"

function CategoryPage() {
    const ProductCategoryUrl=`${BASE_URL}/productsbycategory`
    const [category,setCategoryData]=useState([]);
    useEffect(()=>{
        axios.get(ProductCategoryUrl).then((response) => {
            console.log(response.data.data);
            setCategoryData(response.data.data);
          });

    },[]);

  return (
    <div className="container mt">
        <div className="row row-cols-2">
  
  
        { category.map((item)=>(
      <div class="card bg-dark text-white" >

        <div class="card-img-overlay text-center">
        <img src={item.image}   />
          <h5 class="card-title">{item.categoryname}</h5>
    
          <p class="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
             ))
            }
 
    </div>

    </div>
  );
}

export default CategoryPage;
