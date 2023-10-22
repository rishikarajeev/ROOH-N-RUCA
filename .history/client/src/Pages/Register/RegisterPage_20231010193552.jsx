import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Header3 from "../../Components/Header/Header";
import { Container } from "react-bootstrap";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";

function FormExample() {
  const url = `${BASE_URL}/register`;

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    username: "",
    name:"",
    password: "",
    location: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    name:"",
    password: "",
    location: "",
    phonr: "",
  });

  const enterDetails = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  
  };

  const userRegister = (event) => {
    try{
    const newErrors = validateForm();
    
    console.log(newErrors);

    const form = event.currentTarget;


      
      event.preventDefault();
      setErrors(newErrors);
    
  }catch(error)
  {
    console.log(error);
  }
  };
  const validateForm = () => {

    if (!data.username.trim()) {
      setErrors({ ...errors, username: "Username is required." });
      console.log(errors);
    }

    if (!data.location.trim()) {
      setErrors({ ...errors, location: "location is required." });
    
    }
    if (!data.name.trim()) {
      setErrors({ ...errors, name: "name is required." });
    
    }

    if (!data.mobile.trim()) {
      setErrors({ ...errors, mobile: "mobile is required." });
    }
    if (!data.password.trim()) {
      setErrors({ ...errors, password: "mobile is required." });
    }

    console.log(errors);

  
 
  };

  const isValidEmail = (email) => {
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container>
      <Header3 />
      <div className="register-bg">
        <Form
          className="p-3"
          noValidate
          validated={validated}
          onSubmit={userRegister}
          style={{ width: "18rem" }}
        >
          <Form.Group
            controlId="validationCustomUsername"
            className="mb-3 mt-5 "
          >
            <Form.Label className="text-3xl font-bold underline text-white">
              Username
            </Form.Label>
            <InputGroup hasValidation id="Username">
              <InputGroup.Text >@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={enterDetails}
                aria-describedby="inputGroupPrepend"
              
              />
              <Form.Control.Feedback >
                {errors.username}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={enterDetails}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Name" className="mb-3">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              onChange={enterDetails}
              placeholder="Name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Mobile" className="mb-3">
            <Form.Label className="text-white">Mobile</Form.Label>
            <Form.Control
              required
              type="number"
              name="phone"
              onChange={enterDetails}
              placeholder="mobile"
              defaultValue="mobile"
            />
            <Form.Control.Feedback type="invalid">
              {errors.mobile}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="Location">
            <Form.Label className="text-white">Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              required
              name="location"
              onChange={enterDetails}
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              className="text-white"
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>

          <Button className="bg-warning" type="submit">
            Submit form
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default FormExample;