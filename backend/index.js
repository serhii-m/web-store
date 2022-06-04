require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const adminRouter = require('./src/routes/adminRouter')
const tagTypeRouter = require('./src/routes/tagTypeRouter')
const typeRouter = require('./src/routes/typeRouter')
const productRouter = require('./src/routes/productRouter')
const orderRouter = require('./src/routes/orderRouter')
const paymentRouter = require('./src/routes/paymentRouter')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({origin: "http://localhost:3000", withCredentials: true}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({}))
app.use("/", adminRouter)
app.use("/", tagTypeRouter)
app.use("/", typeRouter)
app.use("/", productRouter)
app.use("/", orderRouter)

app.post("/payment", cors(), async (req, res) => {
  const { amount, id, email } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

const options = { useUnifiedTopology: true, useNewURLParser: true }

const startApp = async ()  => {
  try {
    await mongoose.connect(process.env.DB_URL, options, () => console.log('CONNECTED TO DB!'))
    app.listen(PORT, () => console.log(`SERVER NOW RUNNING ON PORT ${PORT}...`))
  } catch (err) {
    console.log(err)
  }
}

startApp()

