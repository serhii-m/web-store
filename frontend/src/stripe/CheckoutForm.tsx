import React from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: "card",
      card: elements!.getElement(CardElement)!
    })

    if (!error) {
      console.log("Token generated!", paymentMethod)

      try {
        const { id } = paymentMethod!

        const res = await axios.post(
          'http://localhost:5000/payment',
          {
            amount: 1000,
            email: 'vasya@gmail.com',
            id: id
          }
        )

        if (res.data.success) {
          console.log("Payment successful!")
        }
      } catch (error) {
        console.log("CheckoutForm!", error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}
      style={{marginTop: '20px', width: '100px', height: '50px'}}>
        Pay
      </button>
    </form>
  )
}

export default CheckoutForm;