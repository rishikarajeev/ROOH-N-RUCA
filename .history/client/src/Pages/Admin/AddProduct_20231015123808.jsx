import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  DropdownItem,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import axios from "axios";
import Header3 from "../../Components/Header/Header";
import { BASE_URL } from "../../Constants/Constants";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const url = `${BASE_URL}/addproduct`;
  const ProductCategoryUrl = `${BASE_URL}/productsbycategory`;
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState([]);
  const [validated, setValidated] = useState(false);
  const SubmitProduct = (event) => {
    const newErrors = validateForm();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (newErrors == false) {
      setValidated(true);
      event.preventDefault();

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("image", data.image);

      console.log("data..", data.image);

      axios.post(url, formData).then((response) => {
        console.log(response.data);
        navigate("/adminproducts");
        //setProfileData(response.data.data);
      });
    } else {
      event.preventDefault();
    }
  };
  useEffect(() => {
    axios.get(ProductCategoryUrl).then((response) => {
      console.log(response.data);
      setCategory(response.data.data);
    });
  }, []);

  const addProduct = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const uploadphoto = (e) => {
    console.log("data//", e.target.files[0]);
    setData({ ...data, image: e.target.files[0] });
    setErrors({
      ...errors,
      image: "",
    });
  };

  const validateForm = () => {
    let err = false;

    if (!data.name.trim()) {
      err = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "name is required.",
      }));
    } else if (!data.category.trim()) {
      err = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: "category is required",
      }));
    } else if (!data.price.trim()) {
      err = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "price is required.",
      }));
    } else if (!data.description.trim()) {
      err = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "description is required.",
      }));
    } else if (!data.image) {
      err = true;

      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please upload image",
      }));
    }

    console.log(err);

    return err;
  };

  return (
    <Container>
      <Header3 />
      <Form
        validated={validated}
        onSubmit={SubmitProduct}
        className="m-5 needs-validation"
        noValidate
        encType="multipart/form-data"
      >
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={addProduct}
            isInvalid={!!errors.name}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
       
            <DropdownButton id="dropdown-basic-button" title="Select Category" 
            name="category"
            onChange={addProduct}
            isInvalid={!!errors.category}>
            {category.map((item)=>(
              <Dropdown.Item >{item.categoryname}</Dropdown.Item>
              ))}
            </DropdownButton>

       
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            onChange={addProduct}
            isInvalid={!!errors.price}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.price}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={addProduct}
            isInvalid={!!errors.description}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Image</Form.Label>

          <input
            accept=".png, .jpeg,.jpg"
            type="file"
            name="image"
            onChange={uploadphoto}
            isInvalid={!!errors.image}
          ></input>

          <Form.Control.Feedback type="invalid">
            {errors.image}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
