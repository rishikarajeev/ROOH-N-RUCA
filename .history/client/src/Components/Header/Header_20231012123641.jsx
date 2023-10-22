import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const usertoken = sessionStorage.getItem("usertoken");
  const userRole = sessionStorage.getItem("userRole");

  const navigate = useNavigate();
  return (
    <>
      {["lg"].map((expand) => (
        <div class="sticky-top">
          <Navbar
            key={expand}
            expand={expand}
            className="bg-body-tertiary mb-3"
          >
            <Container fluid>
              <Navbar.Brand className="fw-bold" href="#">
                ROOH N RUCA
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="justify-content-end">
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav
                      className="justify-content-center"
                      bg="light"
                      data-bs-theme="light"
                      activeKey="/home"
                    >
                      <Nav.Item>
                        <Nav.Link className="fs-5 bold text-dark" href="/">
                          Home
                        </Nav.Link>
                      </Nav.Item>
                      {userRole == 1 ? (
                        <>
                          <Nav.Item>
                            <Nav.Link
                              className="fs-5 bold text-dark"
                              eventKey="link-2"
                              href="/products"
                            >
                              Admin Products
                            </Nav.Link>
                          </Nav.Item>
                          <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Add Items"
                            menuVariant="dark"
                          >
                            <NavDropdown.Item href="/addproduct">
                           Add product
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/">
                            Add Category
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                              Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                              Separated link
                            </NavDropdown.Item>
                          </NavDropdown>
                        </>
                      ) : (
                        <>
                          <Nav.Item>
                            <Nav.Link
                              className="fs-5 bold text-dark"
                              eventKey="link-2"
                              href="/viewproducts"
                            >
                              Products
                            </Nav.Link>
                          </Nav.Item>
                        </>
                      )}
                      {usertoken ? (
                        <>
                          <Nav.Item>
                            <Nav.Link
                              className="fs-5 bold text-dark"
                              eventKey="link-2"
                              href="/profile"
                            >
                              Profile
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="fs-5 bold text-dark"
                              eventKey="link-2"
                              href="/cartproducts"
                            >
                              Cart
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="fs-5 bold text-dark"
                              eventKey="link-2"
                              href="/favourites"
                            >
                              Favourites
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="fs-5 bold text-dark"
                              onClick={(event) => {
                                sessionStorage.clear("usertoken");
                                sessionStorage.clear("userid");
                                navigate("/");
                              }}
                            >
                              Logout
                            </Nav.Link>
                          </Nav.Item>
                        </>
                      ) : (
                        <>
                          <Nav.Item>
                            <Nav.Link
                              className="fs-5 bold text-dark"
                              eventKey="link-2"
                              href="/register"
                            >
                              Register
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="fs-5 bold text-dark"
                              eventKey="link-2"
                              href="/login"
                            >
                              Login
                            </Nav.Link>
                          </Nav.Item>
                        </>
                      )}
                    </Nav>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      ))}
    </>
  );
}

export default Header;
