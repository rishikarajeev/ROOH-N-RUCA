import React, { useState, useEffect } from "react";
import Header3 from "../../Components/Header/Header";
import "../../Assets/css/Styles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card,Button,Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import pic2 from "../../Assets/Images/pic2.jpeg"
import { BASE_URL } from "../../Constants/Constants";

function ProductDetailPage() {
  const Url = `${BASE_URL}/viewproductbyid/`;
  const [profiledata, setProfiledata] = useState({name:"",category:"",description:"",_id:""});

  const { id } = useParams();
  
  const viewUrl = Url + id;

  useEffect(() => {
    axios.get(viewUrl).then((response) => {
      console.log(response.data.data);
      setProfiledata(response.data.data);
    });
  }, []);

  return (
    <Container>
      <Header3 />
      
      <Card className="text-center m-3 ">
        <Card.Header className="">
        <Card.Img variant="top" src={pic2}   style={{ width: '200px', height: '150px' }}/>
          Product name :{profiledata.name}
        </Card.Header>
        <Card.Body>
          <Card.Title>category :{profiledata.category}</Card.Title>
   
          <Card.Text>{profiledata.price}</Card.Text>
          {/* // <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
        <Card.Footer className="text-muted">
        <Card.Text> Description :{profiledata.description}</Card.Text>
          <Link to={`/editproduct/${profiledata._id}`}>
                <Button variant="primary">Edit</Button>

              </Link>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default ProductDetailPage;
