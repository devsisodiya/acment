const express = require("express");
// const bcrypt = require("bcryptjs");
const validator = require("validator");
// const jwt = require("jsonwebtoken");
const multer = require("multer");
const Subscription = require("../model/subscription");
const User = require("../model/user");
require('dotenv').config()


// razorpay

const crypto = require("crypto");
const Razorpay = require("razorpay");
const { db } = require("../model/subscription");

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});



exports.razorpayKey = async (req, res) => {
  try {

    res.status(200).json({
      key: process.env.KEY_ID,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



exports.newSubscription = async (req, res) => {
  try {
    const newSubscription = {
      user: req.userData.id,
      amount: 2500,         // here You can change or take input from frontend
      paymentSuccess: false,

    }

    createSub = await Subscription.create(newSubscription)

    res.status(200).json(createSub)


  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


exports.paymentOrder = async (req, res) => {
  try {
    const { subscriptionId } = req.body

    if (!subscriptionId) {
      req.status(400).json({ error: "enter required field.!" })

    } else {
      // search subscription
      subscription = await Subscription.findById(subscriptionId)

      // data
      const data = {
        amount: subscription.amount * 100,
        currency: "INR",
        payment_capture: "1",
        receipt: "wthcoding001"
      }

      createPayment = await instance.orders.create(data)

      // update subscription
      updateSubscription = await Subscription.findByIdAndUpdate(subscriptionId, { $set: { orderId: createPayment.id } })


      res.status(200).json({
        paymentData: createPayment,
        status: "success"
      })

    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


exports.paymentVerify = async (req, res) => {
  try {


    const { subscriptionId, razorpayPaymentId, razorpaySignature } = req.body
    if (!subscriptionId || !razorpayPaymentId || !razorpaySignature) {
      res.status(400).json({ error: "Enter required field.!" })

    } else {
      // search subscription
      subscription = await Subscription.findById(subscriptionId)

      body = subscription.orderId + "|" + razorpayPaymentId
      var expectedSignature = await crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(body.toString())
        .digest("hex");
      console.log("orderId: " + subscription.orderId)
      console.log("paymentId: " + razorpayPaymentId)
      console.log("expected: " + expectedSignature)
      console.log("razorpay: " + razorpaySignature)

      if (expectedSignature === razorpaySignature) {

        // successful payment

        const razorpayData = {
          razorpayPaymentId: razorpayPaymentId,
          paymentSuccess: true
        }

        // update subscription 
        updatesubscription = await Subscription.findByIdAndUpdate(subscriptionId, { set: razorpayData }, { new: true })

        // On successful payment, we are updating user profile (subscription = true )
        // updateUser
        updateUser = await User.findByIdAndUpdate(subscription.user, { $set: { subscribed: true } }, { new: true })

        res.status(200).json({
          status: "success",
          updatedUser: updateUser
        })

      }
      else {
        res.status(300).json({
          status: "failure",
          error: 'signature not matched.!'
        })
      }
    }


  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

