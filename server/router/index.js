const Router = require('express').Router
const userController = require('../controllers/user-controller')
const {body} = require('express-validator')
const router = new Router()

router.post('/signup',
  body('email').isEmail(),
  body('password').isLength({min: 6, max: 24}),
  userController.signup
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router
