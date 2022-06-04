const express = require("express");
const cors = require("cors");

const processPayment = require("../controllers/paymentController");
const paymentRouter = express.Router();

paymentRouter.post("/payment", cors(), processPayment)

module.exports = paymentRouter;