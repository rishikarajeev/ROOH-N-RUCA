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
    <div className="container mt-5">
        <div className="row row-cols-2">
  {
  
        data.map((key) => (
          <Card style={{ width: "18rem" }} key={key._id}>
            <Card.Img variant="top" src={`/images/${key.image}`} />
            <Card.Body>
              <Card.Title>{key.name}</Card.Title>
              <Card.Text>
                <Row>
                  <Col>15aed</Col>
                  <Col>
                    <i className="fas fa-cart-plus"></i>
                  </Col>
                </Row>
              </Card.Text>
              <Row>
              <Col>
               <Link to={`/productDetail/${key._id}`}> 
                <Button variant="primary" >View</Button>
               </Link> 
              </Col>
                <Col>
              {/* <Link to={`/productDetail/${key._id}`}> */}
                <Button variant="primary" onClick={()=>DeleteProduct(key._id)}>Delete</Button>
              {/* </Link> */}
              </Col>
          
              </Row>
            </Card.Body>
          </Card>
        ))
}
 
    </div>

    </div>
  );
}

export default CategoryPage;
