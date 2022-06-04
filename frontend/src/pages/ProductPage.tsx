import React, {useMemo, useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Container, Row, Col, Spinner, Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {STORE_ROUTE} from "../utils/consts";
import addToCart from '../helpers/addToCart';


const ProductPage: React.FC = () => {
  const location = useLocation()
  const locSlug = location.pathname.split("/")[1]

  const { fetchOneProduct } = useActions()

  useMemo(() => {
    fetchOneProduct(locSlug);
  }, [locSlug]);

  const { product, loading, err } = useTypedSelector(
    (state) => state.oneProduct
  )

  const navigate = useNavigate()

  if (loading) {
    return <Spinner animation="border"/>
  }

  if (err) {
    return <h2>{err}</h2>
  }


  return (
    <div className="prod-wrapper">
      <Container>
        <Row className="flex-center-all">
          <Col sm={8}>
            <div>
              <img
                className='product-image'
                src={process.env.REACT_APP_API_URL + product.img}
                alt={product.slug}
              />
            </div>
          </Col>
          <Col sm={4} >
            <Card className='product-card'>
              <Card.Body>
                <Card.Title style={{fontWeight: "700"}}>
                  {product.title.toUpperCase()}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{product.description}</ListGroupItem>
                <ListGroupItem>Price: {product.price} USD</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button
                  variant="outline-primary"
                  style={{marginRight: "0.8rem"}}
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </Button>
                <Button variant="outline-secondary" onClick={() => navigate(STORE_ROUTE)}>
                  Back to catalog
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductPage;