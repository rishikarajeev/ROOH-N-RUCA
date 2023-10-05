import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Container,Label,Form } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../Constants/Constants";


function DeleteProductConfirmation() {
    const Url = `${BASE_URL}/deleteproduct/`;
    const [data, setData] = useState([]);
    const navigate=useNavigate();
    
    const { id } = useParams();
    const viewUrl = Url + id;
    console.log(viewUrl);
  
    useEffect(() => {
      axios.delete(viewUrl).then((response) => {
        console.log(response.data);
      //  navigate("/products");
       // (response.data)

       
      });
    }, []);
  return (
    <Container><Form><Form.Group className="mb-3">
    <Form.Label>{data.message}</Form.Label></Form.Group></Form></Container>
  )
}

export default DeleteProductConfirmation