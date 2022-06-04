import React from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {STORE_ROUTE} from "../utils/consts";

const OrderPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <h1 className="checkout-header">Checkout</h1>
      <div className="order-wrapper">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAdddress">
            <Form.Label>Delivery address</Form.Label>
            <Form.Control type="text" placeholder="delivery address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAdddress">
            <Form.Label>Your phone</Form.Label>
            <Form.Control type="tel" placeholder="phone" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            The order is confirmed
          </Button>
        </Form>
      </div>
      <div className="d-flex">
        <Button variant="outline-secondary"
                className="ms-auto me-5"
                type="button"
                onClick={() => navigate(STORE_ROUTE)}
        >
          Back to store
        </Button>
      </div>
    </>
  );
};

export default OrderPage;