const Router = require('express').Router
const AuthController = require('../controllers/auth-controller')
const UserController = require('../controllers/user-controller')
const {body} = require('express-validator')
const router = new Router()

router.post('/signup',
  body('email').isEmail(),
  body('password').isLength({min: 6, max: 24}),
  AuthController.signup
)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/create', UserController.create)
router.get('/todos', UserController.getTodos)
router.post('/change-rating', UserController.changeTodoRating)
router.post('/change-status', UserController.changeTodoStatus)

module.exports = router
