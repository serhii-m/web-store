import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, ListGroupItem, ListGroup, Button} from "react-bootstrap";
import {useNavigate} from 'react-router';
import {STORE_ROUTE, ORDER_ROUTE} from "../utils/consts";
import addToCart from '../helpers/addToCart';
import deleteFromCart from '../helpers/deleteFromCart';


const CartPage: React.FC = () => {
  const cartItems = JSON.parse(localStorage.getItem('storeCart')!)
  let productQuantity = 1

  let totalPrice = cartItems.reduce((total: number, item: any) => total += item.price, 0)

  const handleAddToCart = (item: any): void => {
    addToCart(item)
    productQuantity++
  }

 /* const handleMoveFromCart = (item: any): void => {
    setState(deleteFromCart(item))
  }*/

  const cleanCart = (): void => {
    window.localStorage.setItem('storeCart', JSON.stringify([]))
  }

  const navigate = useNavigate()


  return (
    <Container style={{marginTop: "5rem", padding: "20px 0"}}>
      <Row>
        <Col
          sm={10}
          style={{display: "flex", flexWrap: "wrap", margin: "-10px"}}
        >
          {cartItems.length && <h1 className="cart-heading"
                                   children={`Your cart: ${cartItems.length} goods. Total price: ${totalPrice} $`}></h1>}
          {
            cartItems.length > 0
              ?
              <div className="cart-wrapper">
                {cartItems.map((product: any) => (
                  <div key={product._id}>
                    {
                      <Card className="cart-item" style={{width: "27rem"}}>
                        <Card.Img
                          variant="top"
                          src={process.env.REACT_APP_API_URL + product.img}
                        />
                        <Card.Body>
                          <Card.Title>{product.title}</Card.Title>
                          <Card.Text children={`Quantity: ${productQuantity}`}></Card.Text>

                          <Card.Subtitle className="mb-2 text-muted">
                            {product.price} USD
                          </Card.Subtitle>
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="outline-danger"
                              style={{width: "20%"}}
                              onClick={() => deleteFromCart(product)}
                            > -1
                            </Button>
                            <Button variant="outline-primary"
                                    className="ms-auto"
                                    style={{width: "20%"}}
                                    onClick={() => handleAddToCart(product)}
                            > +1
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    }
                  </div>
                ))}
              </div>
              :
              <h1>Your cart is empty!</h1>
          }
        </Col>
        <Col sm={2}>
          <Button variant="outline-primary"
                  className="mb-5"
                  onClick={() => navigate(STORE_ROUTE)}
          >
            Сontinue shopping
          </Button>
          { cartItems.length > 0 &&
            <Button variant="outline-success"
                    className="mb-5 ms-auto"
                    onClick={() => navigate(ORDER_ROUTE)}
            >
              Сheckout
            </Button>
          }
          <div>
            { cartItems.length > 0 &&
                <Button variant="outline-danger"
                        className="mb-5 ms-auto"
                        onClick={() => cleanCart()}
                >
                  Clean cart
                </Button>
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;