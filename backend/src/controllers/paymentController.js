const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const processPayment = async (req, res) => {
  try {
    const {email, amount, id} = req.body

    const myPayment = await stripe.paymentIntents.create({
      recepient_email: email,
      amount: amount,
      currency: "usd",
      payment_method: id,
      confirm: true
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    res.status(200).json({success: true, client_secret: myPayment})
  } catch (e) {
    res.status(500).json({
      message: "Payment Failed!!!",
      success: false,
    })
  }
}

module.exports = processPayment