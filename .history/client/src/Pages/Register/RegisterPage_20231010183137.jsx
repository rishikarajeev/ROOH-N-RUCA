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
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});

  const enterDetails = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const userRegister = (event) => {
    const newErrors = validateForm();

    const form = event.currentTarget;

    if (Object.keys(newErrors).length === 0) {
      setValidated(true);
      event.preventDefault();

      event.preventDefault();
      axios.post(url, data).then((response) => {
        console.log(response.data);
        navigate("/login");
        //setProfileData(response.data.data);
      });
    }else{
      setErrors(newErrors);
    }
  };
  const validateForm = () => {
    let newErrors = {};

    if (!data.username.trim()) {
      newErrors = { ...newErrors, username: "Username is required." };
    }

    if (!data.email.trim()) {
      newErrors = { ...newErrors, email: "Email is required." };
    } else if (!isValidEmail(data.email)) {
      newErrors = { ...newErrors, email: "Invalid email format." };
    }

    if (!data.location.trim()) {
      newErrors = { ...newErrors, password: "Provide valid location." };
    }
    
    if (!data.mobile.trim()) {
      newErrors = { ...newErrors, password: "Provide vali." };
    }
    if (!data.password.trim()) {
      newErrors = { ...newErrors, password: "Password is required." };
    }

    if (data.password !== data.confirmPassword) {
      newErrors = {
        ...newErrors,
        confirmPassword: "Passwords do not match.",
      };
    }

    return newErrors;
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
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={enterDetails}
                aria-describedby="inputGroupPrepend"
                required
              />
           <Form.Control.Feedback type="invalid">
          {errors.username}
        </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
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
          <Form.Group controlId="validationCustom02" className="mb-3">
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
          <Form.Group controlId="validationCustom02" className="mb-3">
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

          <Form.Group controlId="validationCustom03">
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
