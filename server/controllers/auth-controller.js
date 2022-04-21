const {validationResult} = require("express-validator")
const User = require("../models/User")
const Token = require("../models/Token")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class AuthController {
  async signup(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation errors!', errors })
      }
      const {email, password} = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'User already exists!' })
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        email,
        password: hashedPassword
      })
      await user.save()
      return res.status(201).json({ message: "User created!" })

    } catch (error) {
        return res.status(400).json({ message: 'Server error!' })
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' })
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password)

      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Incorrect password' })
      }

      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.jwtSecret,
        { expiresIn: '1h' }
      )
      await Token.create({ user: user.id, token: accessToken })
      // res.cookie('accessToken', accessToken, {httpOnly: true}) ToDo
      return res.json({ accessToken })

    } catch (error) {
        return res.status(400).json({ message: 'Server error!' })
    }
  }

  async logout(req, res) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1]
      await Token.deleteOne({accessToken})
      return res.end()

    } catch (error) {
        return res.status(400).json({ message: 'Server error!' })
    }
  }
}

module.exports = new AuthController()
