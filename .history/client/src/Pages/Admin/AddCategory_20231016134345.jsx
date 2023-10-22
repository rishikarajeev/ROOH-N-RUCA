import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import Header3 from "../../Components/Header/Header";
import { BASE_URL } from "../../Constants/Constants";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const url = `${BASE_URL}/addcategory`;
  const navigate = useNavigate();

  const [data, setData] = useState({
    categoryname: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const SubmitCategory = (event) => {
    const newErrors = validateForm();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (newErrors == false) {
      setValidated(true);
      event.preventDefault();

      const formData = new FormData();
      formData.append("categoryname", data.categoryname);
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

  const addCategory = (e) => {
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

    if (!data.categoryname.trim()) {
      err = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        categoryname: "name is required.",
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
      <Form
        validated={validated}
        onSubmit={SubmitCategory}
        className="m-5 needs-validation"
        noValidate
        encType="multipart/form-data"
      >
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            name="categoryname"
            onChange={addCategory}
            isInvalid={!!errors.categoryname}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.categoryname}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={addCategory}
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

        <Button type="submit">Add Category</Button>
      </Form>
    </Container>
  );
}

export default AddCategory;
