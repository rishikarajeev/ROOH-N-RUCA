import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Header3 from "../../Components/Header/Header";
import bannerImage from '../../Assets/Images/banner.jpg';
import { Button, Container } from "react-bootstrap";
import CategoryPage from "../User/CategoryPage";
import FeaturedProducts from "../User/FeaturedProducts";
import Footer from "../../Components/Footer/Footer";

function Home({searchTerm}) {
  const navigate = useNavigate();

  return (
    <Container>

 
      <Carousel fade>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={bannerImage}
            alt="First slide"
            loading="lazy"
          />
          <Carousel.Caption>
            <h3 className="text-center">Discover & Shop the Trend</h3>
          
          
          </Carousel.Caption>
          <Button></Button>
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={bannerImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={bannerImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
     < CategoryPage/>

     <Footer/>
</Container>
   
  );
}

export default Home;
