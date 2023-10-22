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

  const FavouriteADDurl = `${BASE_URL}/favourite/addfavourites`;
  const usertoken = sessionStorage.getItem("usertoken");

  const username = sessionStorage.getItem("username");
  const RemovefavouriteUrl = `${BASE_URL}/favourite/removefavouriteproduct`;

  const [productdata, setProductData] = useState([]);
  const [favouriteData, setfavouriteData] = useState([]);

  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState({_id:0,favourite:false,username:""});

  //toggle click for favourite icon
  const toggleFavorite = (_id) => {
      console.log("1",_id);
    
      const itemIndex = productdata.findIndex((item) => item._id === _id);
      const updatedFavourite=productdata.filter((item)=> item._id == _id);
      console.log(isFavorite.favourite);
    
      if (itemIndex !== -1) {

        if(isFavorite.favourite===false)
        { 

        updatedFavourite[0].username = username;
        console.log(updatedFavourite);
        setfavouriteData(updatedFavourite);
        setIsFavorite({_id:_id,favourite:true});

        console.log("iiiisFavorite1", updatedFavourite);
        addtoFavourite();
        }else
        {
          const updatedFavourite=productdata.filter((item)=> item._id == _id);
          updatedFavourite[0].username = username;

          console.log(updatedFavourite);
          setfavouriteData(updatedFavourite);
          setIsFavorite({_id:_id,favourite:false});
  
          console.log("iiiisFavorite2", favouriteData);
          removeFavourite(_id);
          
        }
      }
    
    console.log("isFavorite", isFavorite);
  };

  useEffect(() => {

    axios
    .get(ProductUrl).then((response) => {
      console.log(response.data);
      setProductData(response.data.data);
      // console.log(`/client/public/images/${key.image}`);
    });
  }, [usertoken]);

  const addtoFavourite = () => {
    console.log(favouriteData);
    axios.post(FavouriteADDurl,favouriteData[0]).then((response) => {
      console.log(response);
    });
    //navigate("/cart");
  };
  const removeFavourite = (_id) => {
    axios.delete(`${RemovefavouriteUrl}/${_id}`).then((response) => {
      console.log(response.data);
  
      //  navigate("/products");
      // (response.data)
    });
  };

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
                      {isFavorite._id==key._id && isFavorite.favourite==true? (
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
  );
}

export default Products;
