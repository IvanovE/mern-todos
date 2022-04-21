const jwt = require("jsonwebtoken")
const Todo = require("../models/Todo")
const Token = require("../models/Token")

class UserController {
  async create(req, res) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1]
      if (!accessToken) {
        return res.status(400).json({ message: 'You have to be logged in!' })
      }
      jwt.verify(accessToken, process.env.jwtSecret, (error) => {
        if (error) return res.status(403).json({ message: 'Invalid token!' })
      })
      const {title, description, rating} = req.body
      const {user} = await Token.findOne({ token: accessToken })
      const todo = new Todo({
        title,
        description,
        rating,
        status: 'active',
        owner: user
      })
      await todo.save()
      res.status(201)

    } catch (error) {
      console.log(error)
    }
  }

  async getTodos(req, res) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1]
      if (!accessToken) {
        return res.status(400).json({ message: 'You have to be logged in!' })
      }
      jwt.verify(accessToken, process.env.jwtSecret, (error) => {
        if (error) return res.status(403).json({ message: 'Invalid token!' })
      })
      const {user} = await Token.findOne({ token: accessToken })
      const todos = await Todo.find({ owner: user })
      res.json(todos)

    } catch (error) {
      console.log(error)
    }
  }

  async changeTodoRating(req, res) {
    try {
      const {id, value} = req.body
      await Todo.updateOne({ _id: id }, {
        rating: value
      })
      const todo = await Todo.find({ _id: id })
      console.log(todo)
      res.end()

    } catch (error) {
      console.log(error)
    }
  }

  async changeTodoStatus(req, res) {
    try {
      const {id, value} = req.body
      await Todo.updateOne({ _id: id }, {
        status: value
      })
      res.end()

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UserController()
