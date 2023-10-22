import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { Alert, Button } from "react-bootstrap";
import Header3 from "../../Components/Header/Header";
import "../../Assets/css/Styles.css";
import pic2 from "../../Assets/Images/pic2.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants/Constants";
import CurrencyDisplay from "../../Components/Currency";

function Products() {
    const ProductUrl = `${BASE_URL}/products`;
    const usertoken = sessionStorage.getItem("usertoken");
    const username = sessionStorage.getItem("username");
    const RemovefavouriteUrl = `${BASE_URL}/favourite/removefavouriteproduct`;
    const FavouriteADDurl = `${BASE_URL}/favourite/addfavourites`;
    const [isFavorite, setIsFavorite] = useState({_id:"",favourite:false,username:""});
    const [productdata, setProductData] = useState([]);

    const toggleFavorite = (_id) => {
      if(isFavorite.favourite==false)
      { 
        setIsFavorite({_id:_id,favourite:true,username:username})
        addtoFavourite(isFavorite);
      }
      else{
        setIsFavorite({_id:_id,favourite:true,username:username})
        addtoFavourite(isFavorite);

      }
        
    };

    const addtoFavourite = (isFavorite) => {
        console.log(isFavorite);
        axios.post(FavouriteADDurl,isFavorite).then((response) => {
          console.log(response);
        });
    
      };
    useEffect(() => {
        axios
        .get(ProductUrl,{
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer-token ${usertoken}`
            },
          }).then((response) => {
          console.log(response.data);
          setProductData(response.data.data);
    
        });
      }, [usertoken]);



  return (
    <Container fluid className=" mb-3">
    <Header3 />
    <Row className="justify-content-md-center">
      {productdata.map((key) => (
        <Card className="gap-2 m-2" style={{ width: "18rem" }} key={key._id}>
          <Link to={`/productItemDetail/${key._id}`}>
            <Card.Img variant="top" src={`/images/${key.image}`} />
          </Link>
          <Card.Body>
            <Card.Title>{key.name}</Card.Title>
            <Card.Text>
              <Row>
                <Col>
                  {" "}
                  <Card.Title className="fs-6 ">
                    {" "}
                    <CurrencyDisplay
                      amount={key.price}
                      currencySymbol="AED"
                    />
                  </Card.Title>
                </Col>
                <Col className="text-end" >
                <span
                      className="fs-4 ms-3 text-start" 
                      onClick={() => toggleFavorite(key._id)}
                    >
                      { key.favourite==true? (
                             <i className="fas fa-heart"></i>
                      
                    
                          ) : (
                            <i className="far fa-heart"></i>
                         
                          )}
                    </span>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Row>
  </Container>
  )
}

export default Products