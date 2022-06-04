import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripe = loadStripe('pk_test_51KNtvtC5FuBjVFdl6dGZGgurJ7s2OS8AZA737AJdK1t34RMSanULIaQuh5rIhCJM1fsL3eqzYFCf1cAG3XeVtGAb00IZx9wGvQ')

const StripeContainer: React.FC = () => {
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;