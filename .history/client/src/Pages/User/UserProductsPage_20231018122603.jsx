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

import { AddCartProducts } from "../../Redux/Reducer/CartReducer";
import { getProducts } from "../../Redux/Reducer/ProductReducer";
import { useDispatch, useSelector } from "react-redux";

function Products({ searchTerm }) {
  const ProductUrl = `${BASE_URL}/products`;
const username = sessionStorage.getItem("username");
  const RemovefavouriteUrl = `${BASE_URL}/favourite/removefavouriteproduct`;
  const FavouriteADDurl = `${BASE_URL}/favourite/addfavourites`;
  const [isFavorite, setIsFavorite] = useState({
    name: "",
    favourite: false,
    username: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productdata = useSelector((state) => state.products.data);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <h1 className="text-center">loading..</h1>;
  }
  if (status === "error") {
    return (
      <Alert className="text-center" key="danger" variant="danger">
        error while loading..try again later
      </Alert>
    );
  }
  const AddCart = (item) => {
    dispatch(AddCartProducts(item));
    //navigate('/cart');
    window.location.reload();
  };

  const toggleFavorite = (_id, fav, name) => {
    if (fav == false) {
      fav = true;
    } else {
      fav = false;
    }
    console.log(fav);
    const updatedObject = {
      ...isFavorite,
      name: name,
      favourite: fav,
      username: username,
    };

    addtoFavourite(updatedObject);
  };

  const addtoFavourite = (isFavorite) => {
    console.log(isFavorite);
    if (isFavorite.name !== "") {
      axios.post(FavouriteADDurl, isFavorite).then((response) => {
        console.log(response);
      });
    }
  };

  return (
    <Container fluid className=" mb-3">
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
                  <Col className="text-end">
                    <span
                      className="fs-4 ms-3 text-start"
                      onClick={() =>
                        toggleFavorite(key._id, key.favourite, key.name)
                      }
                    >
                      {key.favourite == true ? (
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
