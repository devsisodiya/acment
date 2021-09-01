const express = require("express");
const router = new express.Router();


const checkAuth = require("../middleware/check-auth");
const subscriptionController = require("../controllers/subscription");




router.post("/razorpaykey", subscriptionController.razorpayKey);

router.post('/subscription/new', checkAuth, subscriptionController.newSubscription);

router.post('subscription/order', checkAuth, subscriptionController.paymentOrder );

router.post('/subscription/verify', checkAuth, subscriptionController.paymentVerify);



module.exports = router;
