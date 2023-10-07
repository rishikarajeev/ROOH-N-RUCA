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
      <div className="container-fluid p-3">
        <div className="card ">
          <div className="row m-2">
            <div className="col-md-4">
              <img src={`/images/${profiledata.image}`} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title">{profiledata.category}</h4>
                <h5 className="card-title">{profiledata.name}</h5>
                <p className="card-text ">{profiledata.description}</p>
                <h5 className="card-title fw-bold " id="currency">
                  {profiledata.price}
                </h5>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
        
                
     
                <div>
                <Link to={`/editproduct/${profiledata._id}`}>
                  <button
                    className="btn btn-primary fw-bold m-2"
                    type="button"
                
                  >
                   Edit
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Container>
  );
}

export default ProductDetailPage;
