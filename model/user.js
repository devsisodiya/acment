const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = mongoose.Schema({
    subscribed: {
        type: Boolean,
        default: false
    },
    username: {
        type: String
    },
    email:{
        type: String,
        unique:[true, "Email is already present"],
    },
    phone: {
        type:Number,
        unique: [true, "Phone no. is already present"]
    },
    parent_phone: {
        type: String
    },
    address:{
        type: String
    },
    password: {
        type: String
    },
    exam: {
        type: String
    },
    profile: {
        type: String,
        default: "/userImg/default.png"
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'Mentor',
    }],
})

var User = mongoose.model('User', UserSchema)

module.exports = User