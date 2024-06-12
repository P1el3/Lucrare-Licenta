//importing modules
const express = require('express')
const userController = require('../controllers/userController')
const {signup, login, isAgency} = userController
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/register', userAuth.saveUser, signup)

//login route
router.post('/login', login)
 //is agency check
router.get('/is-agency/:id', isAgency)

module.exports = router