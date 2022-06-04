import React, {ChangeEventHandler, useEffect, useMemo, useState} from "react";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Card, Button} from "react-bootstrap";
import PlaceHolder from "./PlaceHolder";
import {useLocation, useNavigate} from "react-router-dom";
import {STORE_ROUTE} from "../utils/consts";
import {PRODUCT_ROUTE} from "../utils/consts";
import {CART_ROUTE} from "../utils/consts";
import Form from 'react-bootstrap/Form';
import addToCart from '../helpers/addToCart';

const ProductsList: React.FC = () => {
  const { products, err } = useTypedSelector(
    (state) => state.product
  )
  
  const { fetchProducts } = useActions();

  useMemo(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  if (err) {
    return <h2>{err}</h2>;
  }

  const cutDescription = (description: string, from: number = 0, to: number = 100) =>
    description.length <= 100 ? description : description.slice(from, to) + "...";

  const seeProduct = (slug: string) => {
    const product = products.find(prod => prod.slug === slug)
    navigate(`/${slug}`);
  }

  const bestSellers = [...products].sort((a, b) => b.orderCounter - a.orderCounter).slice(0, 3)

  
  return (
    <div>
      <Form.Select aria-label="Default select"
                   className="w-25 me-auto ms-4"
      >
        <option value="1">Price: Low to High</option>
        <option value="2">Best Sellers</option>
        <option value="3">Price: High to Low</option>
        <option value="4">New Arrivals</option>
      </Form.Select>
      <h3 className="sellers-heading">Best Sellers</h3>
      <div className="best-sellers">
        { bestSellers.map((product) => (
        <div key={product._id}>
          { document.readyState !== 'complete' && <PlaceHolder /> }
          <Card style={{width: "27rem", border: "1px solid gold"}}>
            <Card.Img
              variant="top"
              src={process.env.REACT_APP_API_URL + product.img}
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{cutDescription(product.description)}</Card.Text>
              <Card.Text className="bs-counter">{`Orders: ${product.orderCounter}`}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">
                {product.price} USD
              </Card.Subtitle>
              <div className="d-flex">
                <Button
                  variant="outline-primary"
                  onClick={() => seeProduct(product.slug)}
                  style={{ width: "80%" }}
                >
                  More about the product
                </Button>
                <Button variant="outline-primary"
                        className="ms-auto"
                        onClick={() => addToCart(product)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart4"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                  </svg>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        ))}
      </div>
      <div className="productsWrapper position-relative">
        { products.map((product) => (
          <div key={product._id}>
            { document.readyState === 'loading' && <PlaceHolder /> }
            <Card style={{width: "27rem"}}>
              <Card.Img
                variant="top"
                src={process.env.REACT_APP_API_URL + product.img}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{cutDescription(product.description)}</Card.Text>
                <Card.Text>{`Orders: ${product.orderCounter}`}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  {product.price} USD
                </Card.Subtitle>
                <div className="d-flex">
                  <Button
                    variant="outline-primary"
                    onClick={() => seeProduct(product.slug)}
                    style={{ width: "80%" }}
                  >
                    More about the product
                  </Button>
                  <Button variant="outline-primary"
                          className="ms-auto"
                          onClick={() => addToCart(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart4"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;