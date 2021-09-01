const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MentorSchema = mongoose.Schema({
    username: {
        type: String
    },

    email: {
        type: String,
        // unique:[true, "Email is already present"],
    },
    phone: {
        type: Number,
        // unique: [true, "Phone no. is already present"]
    },
    address: {
        type: String
    },
    password: {
        type: String
    },
    exam: {
        type: String
    },
    subject: {
        type: String
    },
    profile: {
        type: String,
        default: "/profiles/default.png"
    },
    studyMaterial: [{
        topic: {
            type: String
        },
        link: {
            type: String
        },
        document: {
            type: String
        }
    }],
    videoData: [{
        video: {
            type: String
        },
        topic: {
            type: String
        },
        desc: {
            type: String
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "Mentor"
        }
    }, { timestamps: true }],
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    unfollow: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    collection: 'mentors'
});



const Mentor = mongoose.model('Mentor', MentorSchema)

module.exports = Mentor