import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, InputGroup, Container,Alert } from "react-bootstrap";
import Header3 from "../../Components/Header/Header";
import { BASE_URL } from "../../Constants/Constants";

const EdiProductDetail = () => {
  const { id } = useParams();
  const viewUrl = `${BASE_URL}/viewproductbyid/${id}`;
  const updateUrl = `${BASE_URL}/updateproduct/${id}`;
  const adminRoleUrl = `${BASE_URL}/admin/adminrole`;
  const token=sessionStorage.getItem("usertoken");


  const [profiledata, setProfileData] = useState({name:"",category:"",price:"",description:"",image:""});
  const navigate = useNavigate();
  const [role, setRole] = useState();

 //useffeect to call api to check if role is admin 
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
 //useffeect to call api to view products
  useEffect(() => {
    axios.get(viewUrl).then((response) => {
      console.log(response.data.data);
      setProfileData(response.data.data);
    });
  }, [id]);
//update products function and state is updated
  const UpdateProduct = (e) => {
    e.preventDefault();

    const formData=new FormData();
    formData.append("name",profiledata.name);
    formData.append("category",profiledata.category)
    formData.append("price",profiledata.price)
    formData.append("description",profiledata.description)
    formData.append("image",profiledata.image)
    
    axios.put(updateUrl, formData).then((result) => {
      setProfileData(result.data.data);
      console.log("response", result);
      navigate("/products");
    });
  };
  //edit form on change of entering details in form
  const editForm = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profiledata, [name]: value });
    console.log(profiledata);
  };
  const uploadphoto=(e)=>
  {
    console.log("data//",e.target.files[0]);
    setProfileData({...profiledata,image:e.target.files[0]});
  

  }

  return (
    <>
    <Container>
      <Header3 />
      {
      (role===1)?(
      <Form action="" onSubmit={UpdateProduct} encType="multipart/form-data">
        <Form.Group className="mb-3" id="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profiledata.name}
            onChange={editForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Product Category</Form.Label>
          <Form.Control
            type="text"
            value={profiledata.category}
            name="category"
            onChange={editForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="text"
            value={profiledata.price}
            name="price"
            onChange={editForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
            value={profiledata.description}
            onChange={editForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Image</Form.Label>
         <input accept=".png, .jpeg,.jpg" type="file" name="image" onChange={uploadphoto} ></input>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
   ):  (<Alert key="primary" variant="primary">
   You dont have access to this page  because you are not an Admin
    </Alert>)}
    </Container>
    </>
  );
};

export default EdiProductDetail;
