import React, { useState } from "react";
import Header3 from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./LoginPage.css";
import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";

function LoginPage() {
  const [validated, setValidated] = useState(false);
  const url = `${BASE_URL}/login`;

  const navigate=useNavigate();

  const [data, setData] = useState({});
  const [error, setError] = useState('');

  const enterLoginDetails = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

     console.log(data);
     
  };
  
  const userLogin = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
   
    }
    else if (!data.username || !data.password) {
      setError('Please enter both username and password.');
      return;
    }
 
    else{
    setValidated(true);
    event.preventDefault();
   
    axios.post(url, data).then((response) => {
     console.log(response);
     sessionStorage.setItem("userRole",response.data.userRole);
     sessionStorage.setItem("usertoken",response.data.token);
     sessionStorage.setItem("userid",response.data.loginId);
     sessionStorage.setItem("username",response.data.userName);
     console.log(response.data.userRole);
     if(response.data.userRole === 1)
      navigate("/products");
    else
    navigate("/viewproducts");

     window.location.reload();
    
    });
  }
  };

  return (
    <Container>
      <Header3 />
      <div className="login-bg ">
        <Form className="p-3" style={{ width: "18rem" }} onSubmit={userLogin}  validated={validated}>
          <Form.Group className="mt-5 " controlId="formBasicUsername" hasValidation>
            <Form.Label className="text-white">UserName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={enterLoginDetails}
            />
            <Form.Text className=" text-secondary">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={enterLoginDetails}
            />
          </Form.Group>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              className="text-white"
              label="Check me out"
            />
          </Form.Group> */}
          <Button className="bg-warning" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
