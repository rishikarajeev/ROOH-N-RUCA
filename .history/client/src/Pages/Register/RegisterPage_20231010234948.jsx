import React, { useState ,useEffect} from "react";
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
    phone: 0,
  });
  const [errors, setErrors] = useState({
    username: "",
    name:"",
    password: "",
    location: "",
    phone: "",
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

    if (Object.keys(newErrors).length === 0) {
      setValidated(true);
      event.preventDefault();

      axios.post(url, data).then((response) => {
        console.log(response.data);
        navigate("/login");
      });
    } else {
      
      event.preventDefault();
   
    }
  }catch(error)
  {
    console.log(error);
  }
  };
 
  const validateForm = () => {
    let boolean=true;


    if (!data.username.trim()) {

      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required.",
      }));
       console.log("1..",errors);


    }
    else{
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));

    }

     if (!data.location.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Location is required.",
      }));
    
    }
    else{

    }
    if (!data.name.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: "name is required.",
    }));
    
    }
    else{

    }

     if (!data.phone.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone is required.",
      }));
    }
    else{

    }
     if (!data.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
    }
    else{

    }


    console.log(errors);

  return errors;
 
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

          validated={validated}
          onSubmit={userRegister}
          style={{ width: "18rem" }}
          className="p-3 needs-validation" noValidate
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
                isInvalid={!!errors.username}
              
              />
              <Form.Control.Feedback type="invalid" >
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
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
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
              isInvalid={!!errors.name}
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
              placeholder="phone"
              defaultValue="phone"
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
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
              isInvalid={!!errors.location}
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

          <Button className="bg-warning" type="submit" >
            Submit form
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default FormExample;
