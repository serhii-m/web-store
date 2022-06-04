import React, {useEffect, useMemo, useState} from "react";
import {Navbar, Container, Nav, Form, InputGroup, FormControl, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {CART_ROUTE} from "../utils/consts";
import initCartParams from "../helpers/initCartParams";

const StoreHeader: React.FC = () => {
  initCartParams()
  let cart = localStorage.getItem('storeCart')
  let storeCount = JSON.parse(cart!).length
  useEffect(() => JSON.parse(localStorage.getItem('storeCart')!).length, [cart])

  const navigate = useNavigate()

  return (
    <Navbar fixed="top" className="store-header" variant="light">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="/" className="text-light fw-bolder" onClick={() => navigate("/")}>
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          MyWebStore
        </Navbar.Brand>
        <Nav className="me-auto">
        </Nav>
        <InputGroup size="lg" style={{maxWidth: "400px"}}>
          <InputGroup.Text id="inputGroup-sizing-default">

          </InputGroup.Text>
          <FormControl
            placeholder="search..."
            aria-label="Large"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <Button variant="light" size="lg"
                className="ms-auto cart-btn"
                onClick={() => navigate(CART_ROUTE)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-cart4"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
        </Button>
        { (storeCount !== 0) && <span className="cart-counter">{storeCount}</span> }
      </Container>
    </Navbar>
  );
};

export default StoreHeader;