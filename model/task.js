const mongoose = require('mongoose')
const Schema = mongoose.Schema


const answer =  new Schema({
    answer: String,
    answerBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      marks: String,
      remark: String
    
}, { timestamp: true })


const TaskSchema = mongoose.Schema({
    title: {
        type: String
    },
    info: {
        type: String
    },
    task: {
        type: String
    },
    fullMarks: String,
    deadline: {
        type: Date,

    },

    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "Mentor"
    },
    answers: [answer]

},{
    collection: 'task'
})

const Task = mongoose.model('TaskSchema', TaskSchema)

module.exports = Task 