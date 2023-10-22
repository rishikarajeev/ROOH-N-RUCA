import React from 'react'

function Products() {
  return (
    <Container fluid className=" mb-3">
    <Header3 />
    <Row className="justify-content-md-center">
      {productdata.map((key) => (
        <Card className="gap-2 m-2" style={{ width: "18rem" }} key={key._id}>
          <Link to={`/productItemDetail/${key._id}`}>
            <Card.Img variant="top" src={`/images/${key.image}`} />
          </Link>
          <Card.Body>
            <Card.Title>{key.name}</Card.Title>
            <Card.Text>
              <Row>
                <Col>
                  {" "}
                  <Card.Title className="fs-6 ">
                    {" "}
                    <CurrencyDisplay
                      amount={key.price}
                      currencySymbol="AED"
                    />
                  </Card.Title>
                </Col>
                <Col className="text-end" >
                  <span
                    className="fs-4 ms-3 text-start" 
                    onClick={() => toggleFavorite(key._id)}
                  >
                    {isFavorite._id==key._id && isFavorite.favourite==true? (
                           <i className="fas fa-heart"></i>
                    
                  
                        ) : (
                          <i className="far fa-heart"></i>
                       
                        )}
                  </span>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Row>
  </Container>
  )
}

export default Products