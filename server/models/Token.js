const {Schema, model, Types} = require('mongoose')

const TokenSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  }
})

module.exports = model('Token', TokenSchema)
