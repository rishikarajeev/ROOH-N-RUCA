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
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: "Username is required.",
    }));
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      location: "Location is required.",
    }));
    This way, each call to setErrors receives the latest state and correctly updates only the property you specify, without overwriting other changes.
    
    If you want to update multiple properties at once, you can do it within a single setErrors call:
    
    javascript
    Copy code
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: "Username is required.",
      location: "Location is required.",
    }));
    This ensures that you are working with the latest state and correctly updating multiple properties without the risk of overwriting changes.
    
    
    
    
    User
    not updating for usrname and location
    ChatGPT
    If you're encountering issues with setErrors not updating as expected, there are a few potential reasons to consider:
    
    Asynchronous State Updates:
    
    Keep in mind that state updates in React are asynchronous. If you're trying to immediately check the updated state after calling setErrors, it might not reflect the changes immediately. React batches state updates for performance reasons.
    javascript
    Copy code
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: "Username is required.",
    }));
    
    // Don't expect the state to be updated immediately here
    console.log(errors.username); // Might not show the updated value immediately
    Instead, consider checking the updated state in a useEffect or after the component has re-rendered.
    
    Rendering the Errors:
    
    Make sure that you are rendering the errors correctly in your component. Ensure that you are accessing the errors state and displaying the appropriate error messages in your JSX.
    jsx
    Copy code
    <div>
      <p>{errors.username}</p>
      <p>{errors.location}</p>
    </div>
    Check the Component Rerender:
    
    Confirm that your component is rerendering when the state is updated. If you're using functional components, ensure that they are rerendering when the state changes.
    Debugging:
    
    Insert console.log statements to log the values of errors at different points in your component. This can help you trace how the state is changing.
    Here's an example incorporating some of these considerations:
    
    javascript
    Copy code
    import React, { useState, useEffect } from 'react';
    
    const ExampleComponent = () => {
      const [errors, setErrors] = useState({
        username: '',
        location: '',
      });
    
      useEffect(() => {
        console.log('Component re-rendered with updated errors:', errors);
      }, [errors]);
    
      const updateErrors = () => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Username is required.",
        }));
    
        setErrors((prevErrors) => ({
          ...prevErrors,
          location: "Location is required.",
        }));
      };
    
      return (
        <div>
          <button onClick={updateErrors}>Update Errors</button>
    
          <div>
            <p>{errors.username}</p>
            <p>{errors.location}</p>
          </div>
        </div>
      );
    };
    
    export default ExampleComponent;
    If the issue persists, consider sharing more details or relevant parts of your code, and I can provide more specific guidance.
    
    
    
    
    
    

    if (!data.username.trim()) {

   
            console.log("1..",errors);


    }
    else if (!data.location.trim()) {
      setErrors({ ...errors,location: "location is required." });
    
    }
   else if (data.name.trim()==="") {
      setErrors({...errors, name: "name is required." });
    
    }

    else if (!data.phone.trim()) {
      setErrors({...errors, phone: "mobile is required." });
    }
    else if (!data.password.trim()) {
      setErrors({ ...errors,password: "password is required." });
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
              placeholder="phone"
              defaultValue="phone"
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
