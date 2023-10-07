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
  const DeleteProductUrl = `${BASE_URL}/deleteproduct/`;
  const CartADDurl = `${BASE_URL}/addproduct/`;
  const token = sessionStorage.getItem("usertoken");
  const userid = sessionStorage.getItem("userid");
  const adminRoleUrl = `${BASE_URL}/admin/adminrole`;

  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [Favorites, setFavorites] = useState([]);

  const toggleFavorite = () => {
    setIsFavorite(isFavorite);
    if(isFavorite)
    {
    addtoFavourite(isFavorite)
    }
    else
    {

    }
  };

  useEffect(() => {
    axios.get(ProductUrl).then((response) => {
      console.log(response.data);
      setData(response.data.data);
      // console.log(`/client/public/images/${key.image}`);
    });
  }, [token]);



  const addtoFavourite = (event) => {
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
    formData.append("favourite", isFavorite);

    axios.post(addUrl, formData).then((response) => {
      console.log(response);

    });
    //navigate("/cart");
  };

  useEffect(() => {
    axios.delete(viewUrl).then((response) => {
      console.log(response.data);
    //  navigate("/products");
     // (response.data)

     
    });
  }, []);


  return (
    <Container fluid className=" mb-3">
      <Header3 />
      <Row className="justify-content-md-center">
        {data.map((key) => (
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
                      onClick={toggleFavorite}
                    >
                      {isFavorite ? (
                        <i class="fas fa-heart"></i>
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
