import React, {  useState } from "react";
import { Button,  Form,Container } from "react-bootstrap";
import axios from "axios";
import Header3 from "../../Components/Header/Header";
import { BASE_URL } from "../../Constants/Constants";
import { useNavigate } from "react-router-dom";


function AddProduct() {
  const url = `${BASE_URL}/addproduct`;
  console.log(url);
  const navigate=useNavigate();

  const [data, setData] = useState({name:"",category:"",price:"",description:"",image:""});
  const [errors, setErrors] = useState('');
  const [validated, setValidated] = useState(false);
  const SubmitProduct = (event) => {
    const newErrors = validateForm();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else if (newErrors==false) {

    setValidated(true);
    event.preventDefault();
 
    const formData=new FormData();
    formData.append("name",data.name);
    formData.append("category",data.category)
    formData.append("price",data.price)
    formData.append("description",data.description)
    formData.append("image",data.image)

    console.log("data..",data.image);

    axios.post(url, formData).then((response) => {
      
      console.log(response.data);
      navigate("/products");
      //setProfileData(response.data.data);
    });
  }
  else{
    event.preventDefault();
  }

  };

  const addProduct = (e) => {

    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const uploadphoto=(e)=>
  {
    console.log("data//",e.target.files[0]);
    setData({...data,image:e.target.files[0]});
    setErrors({
      ...errors,
      image: '',
    });
  

  }

  const validateForm = () => {
  
  
    let err = false;

  
    if (!data.name.trim()) {
      err = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "name is required.",
      }));
    } else if (!data.category.trime) {
      err = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
    } else if (!data.location.trim()) {
      err = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Location is required.",
      }));
    } else if (!data.name.trim()) {
      err = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "name is required.",
      }));
    } else if (!phoneRegex.test(data.phone)) {
      err = true;
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Invalid phone number",
      }));
    }
  
    console.log(err);
  
    return err;
  };

  return (
    <Container>
      <Header3 />
      <Form onSubmit={SubmitProduct} className="m-5" encType="multipart/form-data">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={addProduct}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            onChange={addProduct}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            onChange={addProduct}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={addProduct}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Image</Form.Label>
         <input accept=".png, .jpeg,.jpg" type="file" name="image" onChange={uploadphoto} ></input>
        </Form.Group>
        

        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
