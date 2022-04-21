const {Schema, model, Types} = require('mongoose')

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Todo', TodoSchema)
