import React, { useEffect, useState } from "react";
import Header3 from "../../Components/Header/Header";
import "../../Assets/css/Styles.css";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Card,
  Row,
  Col,
  Alert,
  Nav,
  Tab,
} from "react-bootstrap";
import { BASE_URL } from "../../Constants/Constants";
import axios from "axios";

function ProfilePage()
 {
  const userid = sessionStorage.getItem("userid");
  const usertoken = sessionStorage.getItem("usertoken");
 // const [userData, setUserData] = useState({username:""});
  const [profileData, setProfileData] = useState({username:"",name:"",phone:"",location:""});
  const viewUrl = `${BASE_URL}/profile`;
  const updateProfileUrl = `${BASE_URL}/profile/updateprofile/${userid}`;
  console.log("token", usertoken);

  console.log("URL", `bearer-token ${usertoken}`);
  

  useEffect(() => {

    axios.get(viewUrl,{
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer-token ${usertoken}`
      },
    }).then((response) => {
      console.log(response);

      //console.log(response.data.data.results[0]);
      setProfileData(response.data.data[0]);

     console.log(profileData);
    //  setUserData(response.data.data);

    
    });
  }, [usertoken]);

  const editForm = (e) => {
    const {name,value}=e.target;
    setProfileData({...profileData,[name]:value});
   //  setUserData({...userData,[name]:value})
    console.log("profileState",profileData);
   // console.log("userData",userData);

  };
  const UpdateProfile = (e) => {
   //window.location.reload();
    axios.put(updateProfileUrl, profileData,

      ).then((response) => {
      console.log("response", response);

    });
  };

  return (
    <div>

      <Container className="BgImage " fluid>
        <Tab.Container>
          <Row>
            <Col >
          <Nav fill variant="tabs" defaultActiveKey="account" className="p-3 mt-5 flex-column justify-content-center">
            <Nav.Item className="bg-white me-2">
              <Nav.Link eventKey="account" className=" text-black" active >
                Account Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="bg-white me-2">
              <Nav.Link eventKey="address" className="text-black"  >
                My Address Book
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="bg-white me-2">
              <Nav.Link eventKey="address1" className=" text-black">
                Orders
              </Nav.Link>
            </Nav.Item>
          </Nav>
          </Col>
          {usertoken ? (
            <Col>
            <Tab.Content className="bg-transparent" >
         
              <Tab.Pane eventKey="account" className="text-start  " >
                <h1 className="text-white p-2">Profile Information</h1>
                <Form
                  action=""
                  onSubmit={UpdateProfile}
                  className="bg-white text-black p-3"
                >
                  <Form.Group className="mb-3" id="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={editForm}
                    />
                  </Form.Group>

                

                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                     value={profileData.name}
                      name="name"
                      onChange={editForm}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="number"
                      name="phone"
                      value={profileData.phone}
                      onChange={editForm}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                     value={profileData.location}
                      onChange={editForm}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="address">
                <Card className="bg-white text-black text-start p-3 ">
                  <Card.Body>
                    <Card.Title>Account Details</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Personal Information
                    </Card.Subtitle>

                    <Card.Title> UserName : </Card.Title>
                    <Card.Title> Password :</Card.Title>
                    <Card.Title> Name :{profileData.name}</Card.Title>
                    <Card.Title>Mobile :{profileData.phone}</Card.Title>
                    <Card.Title href="#">
                      Location :{profileData.location}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="tab3">
                <h2>Tab 3 Content</h2>
                <p>This is the content for Tab 3.</p>
              </Tab.Pane>
            </Tab.Content>
            </Col>
          ) : (
            <Alert key="primary" variant="primary">
              Please Login
            </Alert>
          )}
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default ProfilePage;
