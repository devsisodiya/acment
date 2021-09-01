const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SubscriptionSchema = mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Mentor',
    },
    amount: {
        type: Number,
        default: 5000       // default charge of fees
    },
    paymentSuccess: {
        type: Boolean, 
        default: false
    },
    orderId: {
        type: String
    },
    razorpayPaymentId: {
        type: String
    }


}, { timestamps: true })

var Subscription = mongoose.model('Subscription', SubscriptionSchema)

module.exports = Subscription