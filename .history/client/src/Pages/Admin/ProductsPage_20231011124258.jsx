import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { Alert, Button } from "react-bootstrap";
import Header3 from "../../Components/Header/Header";
import "../../Assets/css/Styles.css";
import pic2 from "../../Assets/Images/pic2.jpeg"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants/Constants";



function AutoLayoutExample() {
  const ProductUrl = `${BASE_URL}/adminproducts`;
  const DeleteProductUrl = `${BASE_URL}/deleteproduct/`;
  const token=sessionStorage.getItem("usertoken");
  const userid=sessionStorage.getItem("userid");
  const adminRoleUrl = `${BASE_URL}/admin/adminrole`;

  const [data, setData] = useState([]);
  const [role, setRole] = useState();
  const navigate=useNavigate();

  useEffect(()=>{
  axios.get(adminRoleUrl,
    {headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    }}).then((response) => {
    console.log(response.data.data.userRole);
    setRole(response.data.data.userRole);
 
  
     });
   },[token])
  useEffect(() => 
  { 
    axios.get(ProductUrl).then((response) => {
      console.log(response.data);
      setData(response.data.data);
    });
 
  }, [token]);
  const DeleteProduct=(id)=>{
    const Url = DeleteProductUrl + id;
    console.log(Url);
    axios.delete(Url).then((response) => {
      //navigate("/products");
      navigate(0);

      //window.location.reload(true)
      console.log(response.data);
     
  
    });

  }

  return (
   
    <Container fluid className=" mb-3">
      <Header3 />
      <Row className="justify-content-md-center">

        {(role===1)?(
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
        ))) :  (<Alert key="primary" variant="primary">
     You dont have access to this page  because you are not an Admin
      </Alert>)}
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;
